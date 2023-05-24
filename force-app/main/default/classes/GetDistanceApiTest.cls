@isTest
private class GetDistanceApiTest {
    @isTest
    static void testFetchCityData() {
        // Create a mock response
        HttpResponse mockResponse = new HttpResponse();
        mockResponse.setBody('Mock response body');

        // Set up the HTTP mock
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator(mockResponse));

        // Call the method under test
        String result = GetDistanceApi.fetchCityData('test');

    }

    @isTest
    static void testFindDistance() {
        // Create a mock response
        HttpResponse mockResponse = new HttpResponse();
        mockResponse.setBody('{"distance": 100}');

        // Set up the HTTP mock
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator(mockResponse));

        // Create a test record for Google_Api__mdt
        // Google_Api__mdt testMetadata = new Google_Api__mdt(Vehicle__c = 10, Flight__c = 30);
        Google_Api__mdt testMetadata = [Select Vehicle__c,Flight__c from Google_Api__mdt][0];

        // Call the method under test
        Map<String, Object> result = GetDistanceApi.findDistance(123, 456);

    }
}