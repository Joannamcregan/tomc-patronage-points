import $ from 'jquery';

class PatronagePoints{
    constructor(){
        this.formSection = $('#tomcIsbnInfoFieldsDiv');
        this.events();
    }
    events(){             
        this.product.on('change', this.populate.bind(this));
    }
    populate(){
        var productId = this.product.val();
        if (productId > 0){
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcISBN/v1/populate',
                type: 'GET',
                data: {
                    'productId': productId
                },
                success: (response) => {
                    console.log(response);
                    if (response.length > 0){
                        this.title.val(response[0]['title']);
                        this.subtitle.val(response[0]['subtitle']);
                        this.description.val(response[0]['description']);
                        this.format.val(response[0]['format']);
                        this.contributor1.val(response[0]['contributor']);
                        this.biography1.val(response[0]['biography']);
                        this.publicationdate.val(response[0]['publicationdate0'] ? response[0]['publicationdate0'] : response[0]['publicationdate1']);
                        this.status.val(response[0]['islive'] === 1 ? 'status_active' : 'status_forthcoming');
                        this.price.val('$' + response[0]['price']);
                        this.language.val(response[0]['language']);
                    }
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }
    }
}

export default PatronagePoints;