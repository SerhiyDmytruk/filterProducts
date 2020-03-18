var $ = require("jquery");
var ko = require("knockout-es5");

import { Product } from './product-data.js';

export function listGrid() {

    function listViewModel() {
        var self = this;

        self.productArray = ko.observableArray();
        self.priceArray = ko.observableArray();

        fetch('./products.json',{
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            },
            mode: 'cors'
        })
        .then((response) => {
            return response.json();
        })
        .then((request) => {

            // get data for Product items
            var mappedDataCat = $.map(request , function(item){
                return new Product(item);
            });

            // get data for Price
            var mappedDataPrice = $.map(request , function(item){
                return item.price;
            });

            mappedDataPrice = mappedDataPrice.filter((item, index) => {
                return mappedDataPrice.indexOf(item) === index;
            });

            self.productArray(mappedDataCat);
            self.priceArray(mappedDataPrice);
        });


        // $.post("products.json", function(request) {
        //
        //     // get data for Product items
        //     var mappedDataCat = $.map(request , function(item){
        //         return new Product(item);
        //     });
        //
        //     // get data for Price
        //     var mappedDataPrice = $.map(request , function(item){
        //         return item.price;
        //     });
        //
        //     mappedDataPrice = mappedDataPrice.filter((item, index) => {
        //         return mappedDataPrice.indexOf(item) === index;
        //     });
        //
        //     self.productArray(mappedDataCat);
        //     self.priceArray(mappedDataPrice);
        // });

        // array for choosen price
        self.newArr = ko.observableArray([]);

        // filter
        self.filterPrice = function (item, event) {
            // if checkbox checked push new item to newArr else remove that price
            if($(event.target).is(':checked')){
                self.newArr.push(item);
            } else {
                var index = self.newArr.indexOf(item);

                if (index !== -1) {
                    self.newArr.splice(index, 1)
                };
            }
            return true;
        };

        // subscribe for changes newArr for show product item using jQuery
        self.newArr.subscribe(function () {
            $('.card-item').each(function () {
                var $this = $(this);
                var dataPrice = $this.data('price').toString();

                if(self.newArr().length >= 1){
                    if(self.newArr().indexOf(dataPrice) === -1){
                        $this.addClass('d-none');
                    }else {
                        $this.removeClass('d-none');
                    }
                } else {
                    $this.removeClass('d-none');
                }
            });

        });

    };

    ko.applyBindings(new listViewModel());
}

