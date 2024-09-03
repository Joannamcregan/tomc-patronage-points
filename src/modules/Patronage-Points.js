import $ from 'jquery';

class PatronagePoints{
    constructor(){
        this.setDatesButton = $('#tomc-points-set-dates-button');
        this.dateRangeSection = $('#tomc-points-dates-section');
        this.startDate = $('#tomc-points-start-date');
        this.endDate = $('#tomc-points-end-date');
        this.pointsSection = $('#tomc-points-display-section');
        this.events();
    }
    events(){             
        this.setDatesButton.on('click', this.showDates.bind(this));
    }
    showDates(){
        this.dateRangeSection.removeClass('hidden');
        this.setDatesButton.removeClass('purple-button');
        this.setDatesButton.addClass('orange-button');
        this.setDatesButton.on('click', this.setDates.bind(this));
    }
    setDates(){
        let startDate = this.startDate.val();
        let endDate = this.endDate.val();
        if (startDate != '' && endDate != ''){
            $('#tomc-points-no-start-date-error').addClass('hidden');
            $('#tomc-points-no-end-date-error').addClass('hidden');
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcPoints/v1/getPointsByDateRange',
                type: 'GET',
                data: {
                    'startDate': startDate,
                    'endDate': endDate
                },
                success: (response) => {
                    console.log(response);
                    this.pointsSection.html('');
                    let newHeading = $('<h2/>').addClass('centered-text').html('<h2>Points Earned Between ' + startDate + ' and ' + endDate);
                    this.pointsSection.append(newHeading);
                    //we will have to fix the date formatting in the heading
                    if (response.length > 0){
                        for (let i = 0; i < response.length; i++){
                            //we will need to output the display name and point total of each item in the response
                        }
                    }
                },
                error: (response) => {
                    console.log(response);
                }
            })
        } else {
            if (startDate == ''){
                $('#tomc-points-no-start-date-error').removeClass('hidden');
            } else {
                $('#tomc-points-no-start-date-error').addClass('hidden');
            }
            if (endDate == ''){
                $('#tomc-points-no-end-date-error').removeClass('hidden');
            } else {
                $('#tomc-points-no-end-date-error').addClass('hidden');
            }
        }
    }
}

export default PatronagePoints;