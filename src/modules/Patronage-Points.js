import $ from 'jquery';

class PatronagePoints{
    constructor(){
        //assigning variables to page elements by ID
        this.setDatesButton = $('#tomc-points-set-dates-button');
        this.dateRangeSection = $('#tomc-points-dates-section');
        this.startDate = $('#tomc-points-start-date');
        this.endDate = $('#tomc-points-end-date');
        this.pointsSection = $('#tomc-points-display-section');
        this.events();
    }
    events(){             
        //adding first click event to the button
        this.setDatesButton.on('click', this.showDates.bind(this));
    }
    showDates(){
        //revealing the section where users can input a date range, changing the button style, and changing the method that gets called when the button is clicked
        this.dateRangeSection.removeClass('hidden');
        this.setDatesButton.removeClass('purple-button');
        this.setDatesButton.addClass('orange-button');
        this.setDatesButton.on('click', this.setDates.bind(this));
    }
    setDates(){
        let startDate = this.startDate.val();
        let endDate = this.endDate.val();
        if (startDate != '' && endDate != ''){
            //if a start and end date have been entered, making sure the error messages are hidden
            $('#tomc-points-no-start-date-error').addClass('hidden');
            $('#tomc-points-no-end-date-error').addClass('hidden');
            //passing the start and end dates to a route in the backend
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
                    // the jquery way of adding a new element, giving it a class, and giving it html. All the classes referenced in the plugin so far are included in CSS files in the theme because we shouldn't need any super unique styling.
                    let newHeading = $('<h2/>').addClass('centered-text').html('<h2>Points Earned Between ' + startDate + ' and ' + endDate);
                    //appending the newly created element to the appropriate container div
                    this.pointsSection.append(newHeading);
                    //we will have to fix the date formatting in the heading
                    if (response.length > 0){
                        for (let i = 0; i < response.length; i++){
                            //we will need to output the display name and point total of each item in the response
                        }
                    } else {
                        //we will need to display some sort of "we don't have any point info for this time period, that may be because no one earned points during that period or it may just be because not all points have been added to the system yet" message
                    }
                },
                error: (response) => {
                    console.log(response);
                }
            })
        } else {
            //shows the appropriate "no start/end date given" error message
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