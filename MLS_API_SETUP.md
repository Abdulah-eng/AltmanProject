# MLS API Setup Guide

This guide will help you configure the MLS API integration to fetch real property data instead of using the database.

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# MLS API Configuration
NEXT_PUBLIC_MLS_API_URL=https://api.your-mls-provider.com/v1
MLS_API_KEY=your_mls_api_key_here
MLS_PROVIDER=default
```

## Supported MLS Providers

The system is designed to work with various MLS APIs. Here are some common configurations:

### 1. RETS/IDX Broker API
```bash
NEXT_PUBLIC_MLS_API_URL=https://rets.idxbroker.com/api/v1
MLS_API_KEY=your_rets_api_key
MLS_PROVIDER=rets
```

### 2. Custom MLS API
```bash
NEXT_PUBLIC_MLS_API_URL=https://your-mls-api.com/api
MLS_API_KEY=your_custom_api_key
MLS_PROVIDER=custom
```

### 3. TheMLS.com API (if available)
```bash
NEXT_PUBLIC_MLS_API_URL=https://api.themls.com/v1
MLS_API_KEY=your_themls_api_key
MLS_PROVIDER=themls
```

## API Endpoints Expected

The system expects your MLS API to have these endpoints:

### GET /properties
Fetch properties with optional filters:
- Query parameters: `city`, `state`, `zipCode`, `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`, `propertyType`, `status`, `limit`, `offset`
- Response format:
```json
{
  "properties": [
    {
      "id": "string",
      "mlsNumber": "string",
      "address": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "price": "number",
      "bedrooms": "number",
      "bathrooms": "number",
      "squareFeet": "number",
      "propertyType": "string",
      "status": "string",
      "description": "string",
      "imageUrl": "string",
      "images": ["string"],
      "yearBuilt": "number",
      "lotSize": "string",
      "features": ["string"],
      "agentName": "string",
      "agentPhone": "string",
      "agentEmail": "string",
      "listingDate": "string",
      "lastUpdated": "string"
    }
  ],
  "totalCount": "number",
  "hasMore": "boolean",
  "page": "number",
  "limit": "number"
}
```

### GET /properties/{id}
Fetch a single property by ID:
- Response format: Single property object (same as above)

## Authentication

The system uses Bearer token authentication. Make sure your API key is properly configured and has the necessary permissions to access property data.

## Fallback Behavior

If the MLS API is not configured or returns an error, the system will automatically fall back to mock data for development purposes. This ensures the website continues to function while you set up the API integration.

## Testing

To test the API integration:

1. Set up your environment variables
2. Start the development server
3. Check the browser console for any API errors
4. Verify that real property data is being displayed

## Troubleshooting

### Common Issues:

1. **API Key Invalid**: Check that your API key is correct and has proper permissions
2. **CORS Issues**: Ensure your MLS API allows requests from your domain
3. **Rate Limiting**: Some MLS APIs have rate limits - check your API documentation
4. **Data Format**: Ensure your API returns data in the expected format

### Debug Mode:

To enable debug logging, add this to your environment variables:
```bash
NEXT_PUBLIC_DEBUG_MLS_API=true
```

## Next Steps

1. Contact your MLS provider to get API access
2. Configure the environment variables
3. Test the integration
4. Customize the property display as needed

The system is designed to be flexible and work with most MLS APIs. If you need help with a specific MLS provider, please provide their API documentation.
