import ApiDocumentation from '../components/api/ApiDocumentation';


const spec = {

  "openapi": "3.0.1",
  "info": {
    "title": "BrightQuery API",
    "description": "BrightQuery, Inc. (\"BQ\") is the leading provider of U.S. business information, including firmographics, financials, credit events, employment, and benefits information. BQ tracks all companies operating in the U.S. that file taxes and have one or more employees (including the owner). BQ sources all information from U.S. government filings, leveraging in particular regulatory filings with the IRS, DOL, and the SEC. Finally, BQ provides over 5,000 fields, including company information, as well as aggregated statistics on industries, sectors, counties, states, and the U.S. economy overall.<br><br>This collection of APIs enables a client to search for a company using parameters such as company name, address, and website. BQ’s proprietary search algorithms utilize fuzzy matching to search and rank the results. For a complete list of all fields that BQ can provide, including detailed financials, please <a href=\"https://s3.us-west-1.amazonaws.com/docs.brightquery.com/BrightQuery_data_dictionary.xlsx\" >click here</a>. Please <a href=\"https://s3.us-west-1.amazonaws.com/docs.brightquery.com/BrightQuery_list+of+IRS+industries_subsector_sector_with_codes_Sep+2021.xlsx\">click here</a> to download the list of IRS industries, which is the primary industry classification system used by BQ.<br><br>Please contact <a href=\"mailto:sales@brightquery.com\" >sales@brightquery.com</a> for sales and <a href=\"mailto:support@brightquery.com\" >support@brightquery.com</a> for product support. You may also call 1-888-BQDATA1. Please visit <a href=\"https://brightquery.com\" target=\"_blank\">https://brightquery.com/</a> to learn more about BQ’s full suite of products, including bulk data feeds.<br><br>© 2021 BrightQuery, Inc. All rights reserved. Visit us at: <a href=\"https://brightquery.com\" target=\"_blank\">https://www.brightquery.com</a>. Contact us at: <a href=\" mailto:sales@brightquery.com\">sales@brightquery.com</a>, <a href=\"mailto:support@brightquery.com\" >support@brightquery.com</a> or 1-888-BQDATA1. For the terms of use of BrightQuery data and products, including these APIs, please see the following link: <a href=\"https://brightquery.com/terms-of-use/\" target=\"_blank\">Terms of Use.</a> <!-- ReDoc-Inject: <security-definitions> -->",
    "version": "2.1.1",
    "x-logo": {
      "url": "BQ-logo.png",
      "altText": "BQ logo"
    }
  },
  "servers": [
    {
      "url": "https://apigateway.brightquery.com/auth"
    }
  ],
  "tags": [
    {
      "name": "BQ APIs"
    }
  ],
  "paths": [
    {
      "Business Identity API": [
        {
          "/business-identity-api/org": {
            "post": {
              "summary": "Organization Search API",
              "description": `An organization is a company, which represents a collection of legal entities that are
under common control; this table contains basic identifying information on the organization, and
how it links to its component legal entities; type of hierarchy.`,
              "security": [
                {
                  "basicAuth": []
                }
              ],

              "example": [
                {
                  "scenario": "Name Address",
                  "parameters": {
                    "company_name": "Flower",
                    "address": "1919 Flowers Cir Thomasville"
                  }
                },
                {
                  "scenario": "Name + Website",
                  "parameters": {
                    "company_name": "Flower",
                    "website": "www.flowersfoods.com"
                  }
                },
                {
                  "scenario": "Name Only",
                  "parameters": {
                    "company_name": "Flower",
                  }
                },
                {
                  "scenario": "Website Only",
                  "parameters": {
                    "website": "www.flowersfoods.com"
                  }
                },
                {
                  "scenario": "Ticker Only",
                  "parameters": {
                    "ticker": "MSFT"
                  }
                },
                {
                  "scenario": "LinkedIn URL",
                  "parameters": {
                    "linkedin_url": "www.linkedin.com/flowers"
                  }
                },
                {
                  "scenario": "CIK Only",
                  "parameters": {
                    "cik": "0001128928"
                  }
                },
                {
                  "scenario": "BQ ID Only",
                  "parameters": {
                    "bq_id": "100003273517"
                  }
                },
              ],
              "parameters": [
                {
                  "name": "bq_id",
                  "in": "query",
                  "description": "Unique ID assigned by BQ to the Organization.",
                  "required": true,
                  "type": "string"
                },
                {
                  "name": "ticker",
                  "in": "query",
                  "description": "TICKER of the Organization if it is public.",
                  "example": "bq_ticker = flo",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "ticker_parent",
                  "in": "query",
                  "description": "TICKER of the Organization's parent holding company if the parent is publicly listed.",
                  "example": "bq_ticker_parent = ‘MSFT’",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "ticker_related",
                  "in": "query",
                  "description": "All TICKERs associated with the Organization if it is publicly listed.",
                  "example": "bq_ticker_related = ‘MSFT’",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "cik",
                  "in": "query",
                  "description": "CIK of Organization.",
                  "example": "bq_cik = 0001128928",
                  "required": false,
                  "type": "int"
                }, {
                  "name": "linkedin_url ",
                  "in": "query",
                  "description": "Organization Linkedin URL.",
                  "example": "bq_company_linkedin_url = https://www.linkedin.com/company/flowers-foods",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "company_name",
                  "in": "query",
                  "description": "Organization Name.",
                  "example": "bq_company_name = FLOWERS FOODS INC",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "address",
                  "in": "query",
                  "description": "Address of Organization.",
                  "example": "bq_company_address1_line_1 = 1919 Flowers Cir Thomasville, GA 31757",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "website",
                  "in": "query",
                  "description": "Website of Organization.",
                  "example": "bq_website = https://www.flowersfoods.com",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "email",
                  "in": "query",
                  "description": "Email of the contact.",
                  "required": false,
                  "type": "string"
                }

              ],
              "responses": {
                "200": {
                  "description": "Success"
                }
              }
            }
          }
        },
        {
          "/business-identity-api/le": {
            "get": {
              "summary": "Legal Entities API",
              "description": `Legal entity identifying and status information, such 
              as home jurisdiction, legal status, active status, legal address, 
              corporate parent and children.`,
              "security": [
                {
                  "apiKey": []
                }
              ],
              "example": [
                {
                  "scenario": "Name + Address",
                  "parameters": {
                    "company_name": "Flower",
                    "address": "1919 Flowers Cir Thomasville"
                  }
                },
                {
                  "scenario": "Name + Website",
                  "parameters": {
                    "company_name": "Flower",
                    "website": "www.flowersfoods.com"
                  }
                },
                {
                  "scenario": "Name Only",
                  "parameters": {
                    "company_name": "Flower",
                  }
                },
                {
                  "scenario": "Website Only",
                  "parameters": {
                    "website": "www.flowersfoods.com"
                  }
                },
                
              ],
              "parameters": [
                {
                  "name": "company_name",
                  "in": "query",
                  "description": "Legal name of the Legal Entity.",
                  "example": "bq_company_name = FLOWERS FOODS INC",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "address",
                  "in": "query",
                  "description": "Address of Legal Entity.",
                  "example": "bq_company_address1_line_1 = 1919 Flowers Cir Thomasville, GA 31757",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "website",
                  "in": "query",
                  "description": "Website of Organization.",
                  "example": "bq_website = https://www.flowersfoods.com",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "email",
                  "in": "query",
                  "description": "Email of the contact.",
                  "required": false,
                  "type": "string"
                }
              ],
              "responses": {
                "200": {
                  "description": "Success"
                }
              }
            }
          }
        },
        {
          "/business-identity-api/location": {
            "get": {
              "summary": "Location API",
              "description": `Business locations (address, industry category) 
              associated with an organization; these are typically stores, offices, 
              distribution centers, and branches.`,
              "security": [
                {
                  "basicAuth": []
                }
              ],
              "example": [
                {
                  "scenario": "Location Name + Address",
                  "parameters": {
                    "location_name": "Flower",
                    "address": "2250 Highmoor Rd"
                  }
                },
                ,
                {
                  "scenario": "Name Only",
                  "parameters": {
                    "location_name": "Flower",
                  }
                },
                {
                  "scenario": "Address Only",
                  "parameters": {
                    "address": "2250 Highmoor Rd"
                  }
                },
                
              ],
              "parameters": [
                {
                  "name": "location_name",
                  "in": "query",
                  "description": "Name of the Location, often a DBA",                 
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "address",
                  "in": "query",
                  "description": "Address of location.",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "city",
                  "in": "query",
                  "description": "City of location.",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "state",
                  "in": "query",
                  "description": "State of location.",
                  "required": false,
                  "type": "string"
                }
              ],
              "responses": {
                "200": {
                  "description": "Success"
                }
              }
            }
          }
        },
      ],
      "KYB Append API": [
        {
          "/bq-append/org": {
            "post": {
              "summary": "Company Search",
              "description": `An organization is a company, which represents a collection of legal entities that are
under common control; this table contains basic identifying information on the organization, and
how it links to its component legal entities; type of hierarchy.`,
              "security": [
                {
                  "basicAuth": []
                }
              ],
              "example": [
                {
                  "scenario": "Name + Address",
                  "parameters": {
                    "company_name": "Flower",
                    "address": "1919 Flowers Cir Thomasville"
                  }
                },
                {
                  "scenario": "Name + Website",
                  "parameters": {
                    "company_name": "Flower",
                    "website": "www.flowersfoods.com"
                  }
                },
                {
                  "scenario": "Name Only",
                  "parameters": {
                    "company_name": "Flower",
                  }
                },
                {
                  "scenario": "Website Only",
                  "parameters": {
                    "website": "www.flowersfoods.com"
                  }
                },
                {
                  "scenario": "Ticker Only",
                  "parameters": {
                    "ticker": "MSFT"
                  }
                },
                {
                  "scenario": "EIN Only",
                  "parameters": {
                    "ein": "27-4827982"
                  }
                },
                {
                  "scenario": "LinkedIn URL",
                  "parameters": {
                    "linkedin_url": "www.linkedin.com/flowers"
                  }
                },
                {
                  "scenario": "LEI Only",
                  "parameters": {
                    "lei":"7YNCQQNDK8FBM9BBTK25"

                  }
                },
                {
                  "scenario": "CIK Only",
                  "parameters": {
                    "cik":"0001128928"
                  }
                },
                {
                  "scenario": "BQ ID Only",
                  "parameters": {
                    "bq_id": "100003273517"
                  }
                },
              ],
              "parameters": [
                {
                  "name": "bq_id",
                  "in": "query",
                  "description": "Unique ID assigned by BQ to the Organization.",
                  "required": true,
                  "type": "string"
                },
                {
                  "name": "ticker",
                  "in": "query",
                  "description": "TICKER of the Organization if it is public.",
                  "example": "bq_ticker = flo",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "ticker_parent",
                  "in": "query",
                  "description": "TICKER of the Organization's parent holding company if the parent is publicly listed.",
                  "example": "bq_ticker_parent = ‘MSFT’",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "ticker_related",
                  "in": "query",
                  "description": "All TICKERs associated with the Organization if it is publicly listed.",
                  "example": "bq_ticker_related = ‘MSFT’",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "lei",
                  "in": "query",
                  "description": "Legal Entity Identifier of the Organization.",
                  "example": "bq_organization_lei = 7YNCQQNDK8FBM9BBTK25",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "cik",
                  "in": "query",
                  "description": "CIK of Organization.",
                  "example": "bq_cik = 0001128928",
                  "required": false,
                  "type": "string"
                },
                 {
                  "name": "linkedin_url ",
                  "in": "query",
                  "description": "Organization Linkedin URL.",
                  "example": "bq_company_linkedin_url = https://www.linkedin.com/company/flowers-foods",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "company_name",
                  "in": "query",
                  "description": "Organization Name.",
                  "example": "bq_company_name = FLOWERS FOODS INC",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "address",
                  "in": "query",
                  "description": "Address of Organization.",
                  "example": "bq_company_address1_line_1 = 1919 Flowers Cir Thomasville, GA 31757",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "website",
                  "in": "query",
                  "description": "Website of Organization.",
                  "example": "bq_website = https://www.flowersfoods.com",
                  "required": false,
                  "type": "string"
                },
                
                {
                  "name": "ein",
                  "in": "query",
                  "description": "EIN of Organization.",
                  "example": "bq_company_ein=582582379",
                  "required": false,
                  "type": "string"
                },
                {
                  "name": "email",
                  "in": "query",
                  "description": "Email of the contact.",
                  "required": false,
                  "type": "string"
                }

              ],
              "responses": {
                "200": {
                  "description": "Success"
                }
              }
            }
          }
        },
        {
          "/business-identity-api/org": {
            "post": {
              "summary": "People Search API",
              "description": `Organization-level Executives including first & last name, job title, email (personal, office),
phone, LinkedIn URL, address.
`,
              "security": [
                {
                  "basicAuth": []
                }
              ],
              "example": [
                {
                  "scenario": "Name",
                  "parameters": {
                    "executives_name":"JOHN W THOMPSON"                    
                  }
                },
                {
                  "scenario": "LinkedIn URL",
                  "parameters": {
                    "linkedin_url":"linkedin.com/in/john-thompson-314312116"
                  }
                }                
              ],
              "parameters": [
                {
                  "name": "executives_name ",
                  "in": "query",
                  "description": "Full name of the Executive.",
                  "required": true,
                  "type":"string"
                },
                {
                  "name": "linkedin_url",
                  "in": "query",
                  "description": "Executive Linkedin URL",
                  "required": false,
                  "type":"string"
                },
                {
                  "name": "email",
                  "in": "query",
                  "description": "Email Address of Executive.",
                  "required": false,
                  "type":"string"
                }
              ],
              "responses": {
                "200": {
                  "description": "Success"
                }
              }
            }
          }
        },
      ],
      "Extraction API": [
        {
          "/bq-prod-api/financials": {
            "post": {
              "summary": "Financials and Employment API",
              "description": `This API offers current and historic Financials and Employment data for approximately 60M
companies that do business in the US.`,
              "security": [
                {
                  "apiKey": []
                }
              ],
            
              "parameters": [
                {
                  "name": "bq_id",
                  "in": "query",
                  "description": "Unique ID assigned by BQ to the Organization.",
                  "required": true,
                  "type": "int",
                  "example": "bq_id = 100003273517"
                },
              ],
              "responses": {
                "200": {
                  "description": "Success"
                }
              }
            }
          }
        },
        {
          "/bq-extraction-api/financials/historical-employment": {
            "get": {
              "summary": "Historical Employment API",
              "description": `This API offers current and historic Employment data for approximately 60M companies that do
business in the US.`,
              "security": [
                {
                  "apiKey": []
                }
              ],
            
              "parameters": [
                {
                  "name": "bq_id",
                  "in": "query",
                  "description": "Unique ID assigned by BQ to the Organization.",
                  "required": true,
                  "type": "int",
                  "example": "bq_id = 100003273517"
                },
              ],
              "responses": {
                "200": {
                  "description": "Success"
                }
              }
            }
          }
        },
        {
          "/bq-extraction-api/bq/locations": {
            "get": {
              "summary": "Locations API",
              "description": `This API provides detailed location data for approximately 69 million companies operating in the United
States. The API delivers comprehensive, location-level information, including:`,
              "security": [
                {
                  "apiKey": []
                }
              ],
            
              "parameters": [
                {
                  "name": "bq_id",
                  "in": "query",
                  "description": "Unique ID assigned by BQ to the Organization.",
                  "required": true,
                  "type": "int",
                  "example": "bq_id = 100003273517"
                },
                {
                  "name": "page",
                  "in": "query",
                  "description": "The current page number to retrieve.",
                  "required": true,
                  "type": "int",
                  "example": "page = 1"
                },
              ],
              "responses": {
                "200": {
                  "description": "Success"
                }
              }
            }
          }
        }
      
      ]
    }
  ],

  "components": {
    "schemas": {

      "response_200": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          }
        }
      },
      "response_400": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "example": "Invalid request body"
          }
        }
      },
      "response_422": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "example": "Search Parameter Missing"
          }
        }
      },
      "response_401": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "example": "Unauthorized"
          }
        }
      }
    },
    "securitySchemes": {
      "basicAuth": {
        "type": "http",
        "scheme": "basic"
      }
    }
  }
}



const ApiPlayground = () => {
  return <ApiDocumentation spec={spec} />;
};

export default ApiPlayground;
