public class GetDistanceApi {
    @auraEnabled
    public static String fetchCityData (String namePrefix){
        HttpRequest req = new HttpRequest();
        //Set Url
        req.setEndpoint('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix='+EncodingUtil.urlEncode(namePrefix, 'UTF-8')+'&sort=name&limit=5');
        //Set Method
        req.setMethod('GET'); 
        req.setHeader('x-rapidapi-host', 'wft-geo-db.p.rapidapi.com');
        req.setHeader('x-rapidapi-key', '50c1365628msh5ec0016186e753cp1bfee8jsn2e1635aaddc5');
        HttpResponse res = new HttpResponse();
        Http htp = new Http();
        res = htp.send(req);
        return res.getBody();
    }
    @auraEnabled
    public static Map<String,Object> findDistance(Integer toCity, Integer fromCity){
        System.debug('to : '+toCity);
        System.debug('From : '+fromCity);
        HttpRequest req = new HttpRequest();
        //Set Url
        req.setEndpoint('https://wft-geo-db.p.rapidapi.com/v1/geo/cities/'+fromCity+'/distance?toCityId='+toCity);
        //Set Method
        req.setMethod('GET'); 
        req.setHeader('x-rapidapi-host', 'wft-geo-db.p.rapidapi.com');
        req.setHeader('x-rapidapi-key', '50c1365628msh5ec0016186e753cp1bfee8jsn2e1635aaddc5');
        HttpResponse res = new HttpResponse();
        Http htp = new Http();
        res = htp.send(req);

        Map<String,Object> distance = (Map<String,Object>)JSON.deserializeUntyped(res.getBody());
        Google_Api__mdt distData = [Select Vehicle__c,Flight__c from Google_Api__mdt][0];

        distance.put('vehicle',(Object)distData.Vehicle__c);
        distance.put('flight',(Object)distData.Flight__c);

        System.debug('Distance '+distance);
        return distance; //giving the distance in miles
    }
}