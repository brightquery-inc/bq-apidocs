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
    "Category1": [
      {
        "/bq-append/org": {
          "post": {
            "summary": "Post Api to test the integration",
            "description": "This is a test api to test the integration",
            "security": [
              {
                "basicAuth": []
              }
            ],

            "example": [
              {
                "scenario": "Name only",
                "parameters": {
                  "company_name": "Flower"
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
                "scenario": "Name + Address + Website",
                "parameters": {
                  "company_name": "Flower",
                  "address": "123 Main St, Anytown, USA",
                  "website": "www.flowersfoods.com"
                }
              }
            ],
            "parameters": [
              {
                "name": "company_name",
                "in": "query",
                "description": "Company name",
                "required": true
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
        "/bq-extraction-api/financials/historical-employment": {
          "get": {
            "summary": "Get Api to test the integration",
            "description": "This is a test api to test the integration",
            "security": [
              {
                "apiKey": []
              }
            ],
            "parameters": [
              {
                "name": "bq_id",
                "in": "query",
                "description": "bq id",
                "required": true
              },
              {
                "name": "page",
                "in": "query",
                "description": "page",
                "required": true
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
    "Category2": [    
      {
        "/bq-extraction-api/bq/locations": {
          "get": {
            "summary": "Get Api to test the integration",
            "description": "This is a test api to test the integration",
            "security": [
              {
                "apiKey": []
              }
            ],
            "parameters": [
              {
                "name": "bq_id",
                "in": "query",
                "description": "bq id",
                "required": true
              },
              {
                "name": "page",
                "in": "query",
                "description": "page",
                "required": true
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
          "get": {
            "summary": "Get Api to test the integration",
            "description": "This is a test api to test the integration",
            "security": [
              {
                "apiKey": []
              }
            ],
            "parameters": [
              {
                "name": "company_name",
                "in": "query",
                "description": "name of company",
                "required": true
              },
              {
                "name": "address",
                "in": "query",
                "description": "Address",
                "required": true
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
