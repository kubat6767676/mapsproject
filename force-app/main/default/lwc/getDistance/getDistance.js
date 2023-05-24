import { LightningElement, track } from 'lwc';
import fetchCityData from '@salesforce/apex/GetDistanceApi.fetchCityData';
import findDistance from '@salesforce/apex/GetDistanceApi.findDistance';

export default class GetDistance extends LightningElement {
    keywords = '';
    data = [];
    data2 = [];
    value2='';
    value1 = '';
    cityFrom;
    cityTo;
    @track result = {};
    placeHolder = 'Search Source'
    placeHolder2 = 'Search Destination'
    connectedCallback() {
        // fetchCityData({namePrefix:'a'}).then(res=>{
        //     console.log(JSON.parse(res));
        //     this.data = JSON.parse(res).data;
        // })
    }
    showOptions(event){
        
        this.template.querySelector('.showOptions').classList.add('slds-hide');
    }
    assignData(event){
        console.log('Inside assignData : ');
        console.log('City',event.currentTarget.dataset.city);
        console.log('Id',event.currentTarget.dataset.id);
        this.cityFrom = event.currentTarget.dataset.id;
        this.value2 = event.currentTarget.dataset.city + ' ('+event.currentTarget.dataset.region+')'; 
        //this.template.querySelector('.showOptions1').classList.add('slds-hide');
    }
    assignData1(event){
        console.log('Inside assignData1 : ');
        console.log('City',event.currentTarget.dataset.city);
        console.log('Id',event.currentTarget.dataset.id);
        this.cityTo = event.currentTarget.dataset.id;
        this.value1 = event.currentTarget.dataset.city + ' ('+event.currentTarget.dataset.region+')'; 
        //this.template.querySelector('.showOptions').classList.add('slds-hide');
    }
    hideDiv(event){
        console.log('inside hideDiv : ');
        setTimeout(() => {
            this.template.querySelector('.showOptions1').classList.add('slds-hide');
            this.template.querySelector('.showOptions').classList.add('slds-hide');
        },500)
    }
    handleMe() {
        console.log('Handle Me');
    }
    showResults(event){
        console.log('showResult : ');
        this.template.querySelector('.showOptions').classList.remove('slds-hide');
    }
    showResults1(event){
        //console.log('test');
        //this.template.querySelector('.shwoOtions1').classList.add('slds-hide');
        this.template.querySelector('.showOptions1').classList.remove('slds-hide');
    }
    showFilterdData(event){
        this.data = [];
        fetchCityData({namePrefix:event.target.value}).then(res=>{
            console.log(JSON.parse(res));
            this.data = JSON.parse(res).data;
        })
    }
    showFilterdData2(event){
        this.data = [];
        fetchCityData({namePrefix:event.target.value}).then(res=>{
            console.log(JSON.parse(res));
            this.data2 = JSON.parse(res).data;
        })
    }
    showDistance(){
    console.log('hello');
    console.log('from : ',typeof(this.cityFrom),' ',this.cityFrom);
    console.log('to : ',typeof(this.cityTo),' ',this.cityTo);
    this.cityTo = parseInt(this.cityTo);
    this.cityFrom = parseInt(this.cityFrom);

    findDistance({toCity:this.cityTo, fromCity:this.cityFrom}).then(res=>{
        console.log('msg',res);//give the distance of the city in miles
        this.result['data'] = res['data'];
        this.result['vehicleCost'] = res['vehicle']*res['data'];
        this.result['flightCost'] = res['flight']*res['data'];
    }).catch(error => {
        console.log('Error : ',error);
    })
    }
}



// addressRecommendations = [];
//     selectedAddress = '';
//     addressDetail = {};
//     city;
//     country;
//     pincode;
//     state;
  
//     get hasRecommendations() {
//         return (this.addressRecommendations !== null && this.addressRecommendations.length);
//     }
     
//     handleChange(event) {
//         event.preventDefault();
//         let searchText = event.target.value;
//         if (searchText) this.getAddressRecommendations(searchText);
//         else this.addressRecommendations = [];
//     }
  
//     getAddressRecommendations(searchText) {
//         getAccounts({ searchString: searchText })
//             .then(response => {
//                 let addressRecommendations = [];
//                 response.forEach(prediction => {
//                     addressRecommendations.push({
//                         Name: prediction.Name,
//                         AnnualRevenue: prediction.AnnualRevenue
//                     });
//                 });
//                 this.addressRecommendations = addressRecommendations;
//             }).catch(error => {
//                 console.log('error : ' + JSON.stringify(error));
//             });
//     }
 
//     resetAddress(){
//         this.city = '';
//         this.country = '';
//         this.pincode = '';
//         this.state = '';
//     }
  
//     handleAddressRecommendationSelect(event) {
//         event.preventDefault();
//         let placeId = event.currentTarget.dataset.value;
//         this.addressRecommendations = [];
//         this.selectedAddress = '';
//         this.resetAddress();
         
 
//         getAddressDetailsByPlaceId({ placeId: placeId })
//             .then(response => {
//                 response = JSON.parse(response);
//                 response.result.address_components.forEach(address => {
//                     let type = address.types[0];
//                     switch (type) {
//                         case 'locality':
//                             this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
//                             this.city = address.long_name;
//                             break;
//                         case 'country':
//                             this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
//                             this.country = address.long_name;
//                             break;
//                         case 'administrative_area_level_1':
//                             this.selectedAddress = this.selectedAddress + ' ' + address.short_name;
//                             this.state = address.short_name;
//                             break;
//                         case 'postal_code':
//                             this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
//                             this.pincode = address.long_name;
//                             break;
//                         case 'sublocality_level_2':
//                             this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
//                             this.addressDetail.subLocal2 = address.long_name;
//                             break;
//                         case 'sublocality_level_1':
//                             this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
//                             this.addressDetail.subLocal1 = address.long_name;
//                             break;
//                         case 'street_number':
//                             this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
//                             this.addressDetail.streetNumber = address.long_name;
//                             break;
//                         case 'route':
//                             this.selectedAddress = this.selectedAddress + ' ' + address.short_name;
//                             this.addressDetail.route = address.short_name;
//                             break;
//                         default:
//                             break;
//                     }
//                 });
//             })
//             .catch(error => {
//                 console.log('error : ' + JSON.stringify(error));
//             });
//     }