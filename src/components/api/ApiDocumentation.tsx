import React, { useState, useMemo, useEffect, useTransition } from "react";
import {
  Box,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Button,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { Search as SearchIcon, Send as SendIcon } from "@mui/icons-material";
import axios from "axios";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./apiDocumentation.css";
import "./../../style.css";

interface ApiDocumentationProps {
  spec: any; // OpenAPI spec object
}

interface ApiEndpoint {
  path: string;
  method: string;
  summary: string;
  description?: string;
  parameters?: any[];
  requestBody?: any;
  responses?: any;
  security?: any[];
  example?: any[];
}

interface CategorizedEndpoints {
  [category: string]: ApiEndpoint[];
}

const ApiDocumentation: React.FC<ApiDocumentationProps> = ({ spec }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(
    null
  );
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [selectedExample, setSelectedExample] = useState<string>("");
  const [expandRequestAccordion, setExpandRequestAccordion] =
    useState<boolean>(true);
  const [expandResponseAccordion, setExpandResponseAccordion] =
    useState<boolean>(true);
  const [expandAuthAccordion, setExpandAuthAccordion] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState("200")
  const [actualApiResponse, setActualApiResponse] = useState<any>(null)
  
  // Extract all endpoints from the spec
  const endpoints = useMemo<CategorizedEndpoints>(() => {
    const result: CategorizedEndpoints = {};

    if (spec.paths) {
      spec.paths.forEach((categoryGroup: any) => {
        Object.entries(categoryGroup).forEach(
          ([category, endpoints]: [string, any]) => {
            if (!result[category]) {
              result[category] = [];
            }

            endpoints.forEach((endpointGroup: any) => {
              Object.entries(endpointGroup).forEach(
                ([path, methods]: [string, any]) => {
                  Object.entries(methods).forEach(
                    ([method, details]: [string, any]) => {
                      if (method !== "parameters") {
                        result[category].push({
                          path,
                          method: method.toUpperCase(),
                          ...details,
                        });
                      }
                    }
                  );
                }
              );
            });
          }
        );
      });
    }
    return result;
  }, [spec]);

  // Select first endpoint by default
  useEffect(() => {
    if (Object.keys(endpoints).length > 0 && !selectedEndpoint) {
      const firstCategory = Object.keys(endpoints)[0];
      const firstEndpoint = endpoints[firstCategory][0];
      setSelectedEndpoint(firstEndpoint);
      setResponse(firstEndpoint.responses[0].success)
      if (firstEndpoint.example && firstEndpoint.example.length > 0) {
        setSelectedExample(firstEndpoint.example[0].scenario);
      } else {
        setSelectedExample("");
      }
    }
  }, [endpoints, selectedEndpoint]);

  // Filter endpoints based on search query
  const filteredEndpoints = useMemo<CategorizedEndpoints>(() => {
    const filtered: CategorizedEndpoints = {};
    Object.entries(endpoints).forEach(([category, categoryEndpoints]) => {
      const filteredCategoryEndpoints = categoryEndpoints.filter(
        (endpoint) =>
          endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
          endpoint.summary?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredCategoryEndpoints.length > 0) {
        filtered[category] = filteredCategoryEndpoints;
      }
    });
    return filtered;
  }, [endpoints, searchQuery]);

  const handleEndpointClick = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setRequestBody("");
    setActualApiResponse(null);
    setResponse(endpoint.responses[0].success)
    setTabValue("200");
    if (endpoint.example && endpoint.example.length > 0) {
      setSelectedExample(endpoint.example[0].scenario);
    } else {
      setSelectedExample("");
    }
  };

  const handleTryIt = async () => {
    if (!selectedEndpoint) return;

    try {
      startTransition(async () => {
        // Build query parameters
        const queryParams = new URLSearchParams();
        let data = {};
        selectedEndpoint.parameters?.forEach((param: any) => {
          if (param.in === "query" && paramValues[param.name]) {
            data = {
              [param.name]: paramValues[param.name],
            };
            queryParams.append(param.name, paramValues[param.name]);
          }
        });

        selectedEndpoint.example?.forEach((example: any) => {
          if (example.scenario === selectedExample) {
            data = example.parameters;
          }
          Object.entries(data).forEach(([key, value]) => {
            queryParams.append(key, String(value));
          });
        });
        // Here you would make the actual API call
        // For now, we'll just simulate a response

        const baseUrl =
          "https://apigateway.brightquery.com/auth" + selectedEndpoint.path;
        const url = queryParams.toString()
          ? `${baseUrl}?${queryParams.toString()}`
          : baseUrl;

        const token = btoa(`${userName}:${password}`);
        const method = selectedEndpoint.method.toLowerCase();

        await axios({
          url: method === "get" ? url : baseUrl,
          data: method === "get" ? null : data,
          method,
          headers: {
            "Content-Type": "*/*",
            Accept: "*/*",
            Authorization:
              selectedEndpoint.security &&
                selectedEndpoint.security.length > 0 &&
                selectedEndpoint.security[0].apiKey
                ? `Bearer ${apiKey}`
                : `Basic ${token}`,
            "x-api-key": apiKey,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              setActualApiResponse(res.data)
              setExpandRequestAccordion(false);
              setExpandResponseAccordion(true);
              setExpandAuthAccordion(false);
              setTabValue(res.status.toString())
            }
          })
          .catch((err) => {
            const apiErr = {
              data:{
                message: err.response.data.message
              },
              status: err.response.status 
            }
            setActualApiResponse(apiErr);
            setExpandRequestAccordion(false);
            setExpandResponseAccordion(true);
            setExpandAuthAccordion(false);
            setTabValue(err.status.toString())
          });
      });
    } catch (err) {
      setResponse({
        status: 500,
        error: "Failed to make request",
      });
    }
  };

  const handleTabChange=(e:React.SyntheticEvent, val:string)=>{
    setTabValue(val);
  }

  return (
    <Box
      sx={{
        position: "sticky",
        top: "0",
        display: "flex",
        height: "calc(100vh - 64px)",
        width: "100%",
        mt: "100px",
      }}
    >
      {/* Left Panel - API List */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          overflowY: "auto",
          flexDirection: {
            xs: "column",
            sm: "column",
          },
          // height: {
          //   xs: "auto",
          //   sm: "calc(100vh - 40px)",
          // },
          height: "96vh",
          width: {
            xs: "100%",
            sm: "25%",
            md: "20%",
          },
          mt: "0px",
          borderRight: " solid 1px #ccc",
        }}
      >
        <Box
          sx={{
            p: 2,
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
            zIndex: 1,
          }}
        >
          <TextField
            className="custom-search-input"
            fullWidth
            variant="outlined"
            placeholder="Search APIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <List>
          {Object.entries(filteredEndpoints).map(
            ([category, categoryEndpoints], index) => (
              <Accordion
                className="catetorymain"
                key={category}
                sx={{
                  boxShadow: "none",
                  "&:before": {
                    display: "none",
                  },
                }}
                defaultExpanded={index === 0 ? true : false}
              >
                <AccordionSummary
                  className="leftCategory"
                  sx={{
                    mt: 1,
                    minHeight: "20px",
                    "&.MuiAccordionSummary-root": {
                      paddingY: "4px",
                    },
                    "& .MuiAccordionSummary-content": {
                      marginY: "4px",
                    },
                  }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography variant="subtitle1">{category}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  {categoryEndpoints.map((endpoint, index) => (
                    <React.Fragment key={`${endpoint.method}-${endpoint.path}`}>
                      <ListItem disablePadding>
                        <ListItemButton
                          selected={
                            selectedEndpoint?.path === endpoint.path &&
                            selectedEndpoint?.method === endpoint.method
                          }
                          onClick={() => handleEndpointClick(endpoint)}
                        >
                          <ListItemText
                            className="custom-listButton"
                            primary={
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Chip
                                  label={endpoint.method}
                                  size="small"
                                  color={
                                    endpoint.method === "GET"
                                      ? "success"
                                      : endpoint.method === "POST"
                                        ? "primary"
                                        : endpoint.method === "PUT"
                                          ? "warning"
                                          : endpoint.method === "DELETE"
                                            ? "error"
                                            : "default"
                                  }
                                />
                                <Typography className="customParagraph" noWrap>
                                  {endpoint.path}
                                </Typography>
                              </Box>
                            }
                            secondary={endpoint.summary}
                          />
                        </ListItemButton>
                      </ListItem>
                      {index < categoryEndpoints.length - 1}
                    </React.Fragment>
                  ))}
                </AccordionDetails>
              </Accordion>
            )
          )}
        </List>
      </Paper>

      {/* Middle Panel - API Description */}
      <Paper
        elevation={0}
        sx={{
          width: {
            xs: "100%",
            sm: "40%",
            md: "50%",
          },
          //   minWidth: "60%",
          overflow: "auto",
        }}
      >
        {selectedEndpoint ? (
          <Box sx={{ p: 3 }} className="customeAppendCnt">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Chip
                label={selectedEndpoint.method}
                color={
                  selectedEndpoint.method === "GET"
                    ? "success"
                    : selectedEndpoint.method === "POST"
                      ? "primary"
                      : selectedEndpoint.method === "PUT"
                        ? "warning"
                        : selectedEndpoint.method === "DELETE"
                          ? "error"
                          : "default"
                }
              />
              <Typography variant="h6">{selectedEndpoint.path}</Typography>
            </Box>

            <Typography variant="h4" gutterBottom>
              {selectedEndpoint.summary}
            </Typography>

            {selectedEndpoint.description && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedEndpoint.description}
              </Typography>
            )}

            {selectedEndpoint.parameters &&
              selectedEndpoint.parameters.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Parameters
                  </Typography>
                  <Box>
                    <Grid container className="gridBorderHdr">
                      <Grid
                        size={3.5}
                        sx={{
                          padding: 1,
                        }}
                      >
                        <Typography variant="body2" fontWeight={700}>
                          Parameter
                        </Typography>
                      </Grid>
                      <Grid
                        size={1.5}
                        sx={{
                          padding: 1,
                        }}
                      >
                        <Typography variant="body2" fontWeight={700}>
                          Type
                        </Typography>
                      </Grid>
                      <Grid
                        size={6}
                        sx={{
                          padding: 1,
                        }}
                      >
                        <Typography variant="body2" fontWeight={700}>
                          Description
                        </Typography>
                      </Grid>
                    </Grid>
                    {selectedEndpoint.parameters.map((param: any) => (
                      <Grid container className="gridBorderCell">
                        <Grid
                          size={3.5}
                          sx={{
                            p: 1,
                          }}
                        >
                          <Typography sx={{ color: "#d63384", fontSize: "" }}>
                            {param.name}
                            {param.required && (
                              <Chip
                                className="txtError"
                                label="Required"
                                size="small"
                                color="error"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Typography>
                        </Grid>
                        <Grid
                          size={1.5}
                          sx={{
                            p: 1,
                          }}
                        >
                          <Typography variant="body2">
                            {param.type || "string"}
                          </Typography>
                        </Grid>
                        <Grid
                          size={6}
                          sx={{
                            p: 1,
                          }}
                        >
                          <Typography variant="body2">
                            {param.description}
                          </Typography>
                          {param.example ? (
                            <Typography>
                              <b>Example:</b> {param.example}
                            </Typography>
                          ) : null}
                        </Grid>
                      </Grid>
                    ))}
                  </Box>
                </Box>
              )}

            {selectedEndpoint.requestBody && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Request Body
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {selectedEndpoint.requestBody.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Content Type:{" "}
                      {Object.keys(selectedEndpoint.requestBody.content)[0]}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Select an API endpoint to view its documentation
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Right Panel - API Playground */}
      <Paper
        elevation={0}
        sx={{
          width: {
            xs: "100%",
            sm: "35%",
            md: "30%",
          },
          //   minWidth: "30%",
          overflow: "auto",
          borderRadius: "12px",
        }}
      >
        <Box sx={{ p: 2 }}>
          {selectedEndpoint && (
            <>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    mb: 2,
                    border: "1px solid #6C757D",
                    borderRadius: "8px",
                    p: 2,
                    pb: 1,
                    backgroundColor: "#3e4c59",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="#fff"
                    display="block"
                    gutterBottom
                  >
                    {selectedEndpoint.method} {selectedEndpoint.path}
                  </Typography>
                </Box>
                <Accordion
                  expanded={expandAuthAccordion}
                  sx={{
                    borderRadius: "8px",
                    border: "1px solid #6C757D",
                    backgroundColor: "#3e4c59",
                    mb: "2",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                    onClick={() => setExpandAuthAccordion(!expandAuthAccordion)}
                  >
                    <Typography gutterBottom sx={{ color: "#fff" }}>
                      Authentication
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: "#52606D" }}>
                    {selectedEndpoint.security &&
                      selectedEndpoint.security.length > 0 &&
                      selectedEndpoint.security[0].apiKey ? (
                      <Box sx={{ mt: 2, mb: 1 }}>
                        <TextField
                          fullWidth
                          label="API Key"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          sx={{
                            mt2: 1,
                            mb: 2,
                            fontSize: "12px !important",
                            "& .MuiInputBase-root": {
                              color: "#fff",
                            },
                            "& label.Mui-focused": {
                              color: "#fff",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#fff",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },
                          }}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          fullWidth
                          className="txtlogin"
                          label="Username"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          sx={{
                            mb: 2,
                            "& .MuiInputBase-root": {
                              color: "#fff",
                              fontSize: "0.85rem", // Reduced input text size
                            },
                            "& input::placeholder": {
                              fontSize: "9px !important", // Reduced placeholder size
                            },
                            "& label.Mui-focused": {
                              color: "#fff",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#fff",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },
                          }}
                        />
                        <TextField
                          className="txtlogin"
                          fullWidth
                          label="Password"
                          value={password}
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          sx={{
                            mb: 2,
                            "& .MuiInputBase-root": {
                              color: "#fff",
                            },
                            "& label.Mui-focused": {
                              color: "#fff",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#fff",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },
                          }}
                        />
                      </Box>
                    )}
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expandRequestAccordion}
                  sx={{
                    my: 2,
                    borderRadius: "8px",
                    backgroundColor: "#3e4c59",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                    onClick={() =>
                      setExpandRequestAccordion(!expandRequestAccordion)
                    }
                  >
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ color: "#fff", fontSize: "1rem" }}
                    >
                      Request
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        bgcolor: "#52606D",
                        mb: 2,
                      }}
                    >
                      {selectedEndpoint.example &&
                        selectedEndpoint.example.length > 0 && (
                          <Box>
                            <InputLabel sx={{ color: "#fff" }}>
                              Example
                            </InputLabel>
                            <Select
                              fullWidth
                              value={selectedExample || ""}
                              onChange={(e) =>
                                setSelectedExample(e.target.value)
                              }
                              label="Example"
                              sx={{
                                color: "#fff",
                                border: "solid 1px #fff",
                                marginTop: "10px",
                                "& .MuiSelect-icon": {
                                  color: "#fff",
                                },
                              }}
                            >
                              {selectedEndpoint.example?.map((example: any) => (
                                <MenuItem
                                  key={example.scenario}
                                  value={example.scenario}
                                >
                                  {example.scenario}
                                </MenuItem>
                              ))}
                            </Select>
                            <Box
                              sx={{
                                mt: 2,
                                p: 1,
                                bgcolor: "grey.100",
                                borderRadius: 1,
                                fontFamily: "monospace",
                                fontSize: "0.875rem",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                maxHeight: 300,
                                overflow: "auto",
                              }}
                            >
                              <JsonView
                                className="iconView"
                                src={
                                  selectedEndpoint.example.find(
                                    (ex: any) => ex.scenario === selectedExample
                                  )?.parameters
                                }
                                displaySize={"collapsed"}
                                editable
                                enableClipboard={true}
                              />
                            </Box>
                          </Box>
                        )}

                      {selectedEndpoint.example === undefined &&
                        selectedEndpoint.parameters &&
                        selectedEndpoint.parameters.length > 0 && (
                          <Box>
                            <Typography
                              variant="caption"
                              color="#fff"
                              display="block"
                              gutterBottom
                              sx={{ my: 2 }}
                            >
                              Query Parameters
                            </Typography>
                            {selectedEndpoint.parameters.map((param: any) => (
                              <Box key={param.name} sx={{ mb: 1 }}>
                                <TextField
                                  fullWidth
                                  label={param.name}
                                  placeholder={param.schema?.type || "string"}
                                  value={paramValues[param.name] || ""}
                                  onChange={(e) =>
                                    setParamValues((prev) => ({
                                      ...prev,
                                      [param.name]: e.target.value,
                                    }))
                                  }
                                  InputProps={{
                                    endAdornment: param.required && (
                                      <InputAdornment position="end">
                                        <Chip
                                          className="txtError"
                                          label="Required"
                                          size="small"
                                          color="error"
                                        />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    mb: 2,
                                    "& .MuiInputBase-root": {
                                      color: "#fff",
                                    },
                                    "& label.Mui-focused": {
                                      color: "#fff",
                                    },
                                    "& .MuiInputLabel-root": {
                                      color: "#fff",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                      "& fieldset": {
                                        borderColor: "white",
                                      },
                                      "&:hover fieldset": {
                                        borderColor: "white",
                                      },
                                      "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                      },
                                    },
                                  }}
                                />
                              </Box>
                            ))}
                          </Box>
                        )}
                      {selectedEndpoint.requestBody && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            gutterBottom
                          >
                            Request Body
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            rows={6}
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            placeholder="Enter request body in JSON format"
                            sx={{
                              "& .MuiInputBase-root": {
                                fontFamily: "monospace",
                                fontSize: "0.875rem",
                              },
                            }}
                          />
                        </Box>
                      )}
                    </Paper>
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={handleTryIt}
                      sx={{ m: 2, width: "90%", boxShadow: "none" }}
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Send"}
                    </Button>
                  </AccordionDetails>
                </Accordion>
                {response && (
                  <Accordion
                    expanded={expandResponseAccordion}
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: "#3e4c59",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                      onClick={() =>
                        setExpandResponseAccordion(!expandResponseAccordion)
                      }
                    >
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ color: "#fff" }}
                      >
                        Response
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0}}>
                    {isPending ?
                     <CircularProgress 
                      color="warning"                    
                      sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '45%',
                        transform: 'translate(-50%, -50%)',
                      }}
                     /> :
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          bgcolor: "#52606D",
                          mb: 2,
                        }}
                      >

                        <Box sx={{ mb: 1 }}>
                          <Chip
                            label={`Status: ${tabValue}`}
                            color={
                              tabValue === "200" ? "success" : "error"
                            }
                            size="small"
                          />
                        </Box>
                        <Box
                          sx={{
                            p: 1,
                            bgcolor: "grey.100",
                            borderRadius: 1,
                            fontFamily: "monospace",
                            fontSize: "0.875rem",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            maxHeight: 300,
                            overflow: "auto",
                          }}
                        >
                        {actualApiResponse !== null ?  
                        <JsonView
                        src={actualApiResponse}
                        displaySize={"collapsed"}
                        dark
                        enableClipboard={true}
                      /> 
                         :
                          <TabContext value={tabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="200" value="200" />
                                {selectedEndpoint.responses[0]?.error?.map((response: any) => (
                                  <Tab label={response.status} value={response.status} />
                                ))}
                              </TabList>
                            </Box>
                            <TabPanel value="200">
                            <JsonView
                            src={response}
                            displaySize={"collapsed"}
                            dark
                            enableClipboard={true}
                          />
                            </TabPanel>
                            {selectedEndpoint.responses[0]?.error?.map((errResponse: any) => (
                            <TabPanel value={errResponse.status}>                             
                            <JsonView
                            src={errResponse}
                            displaySize={"collapsed"}
                            dark
                            enableClipboard={true}
                          />  
                          </TabPanel>
                           
                          ))}
                          </TabContext>
                        }
                          
                        </Box>
                      </Paper>}
                    </AccordionDetails>
                  </Accordion>
                )}
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ApiDocumentation;
