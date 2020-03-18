var ko = require("knockout-es5");

export function Product(data) {
    if(data.images[0]){
        this.images = ko.observable(data.images[0].url);
    }else {
        this.images = './images/small_image.jpg';
    }

    this.name = ko.observable(data.name);
    this.sku = ko.observable(data.sku);
    this.short_description = ko.observable(data.short_description);
    this.price = ko.observable(data.price);
};
