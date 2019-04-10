import moment from 'moment'

export default class helpers {
    valiDate(dateObject) {
        let date = dateObject.date
        //Federal US Holidays
        //*
        var _holidays = {
            'M': {//Month, Day
                '01/01': "New Year's Day",
                '07/04': 'Independence Day',
                '11/11': "Veteran's Day",
                '12/25': "Christmas Day",
            },
            'W': {//Month, Week of Month, Day of Week
                '1/3/1': "Martin Luther King Jr. Day",
                '2/3/1': "Washington's Birthday",
                '5/5/1': "Memorial Day",
                '9/1/1': "Labor Day",
                '10/2/1': "Columbus Day",
                '11/4/4': "Thanksgiving Day",
            },
        }
        var diff = 1 + (0 | (new Date(date).getDate() - 1) / 7);
        var memorial = (new Date(date).getDay() === 1 && (new Date(date).getDate() + 7) > 30) ? '5' : null
        //Checks to see if the date falls on any of the FH
        var c_date = date
        var day_count = 0
        
        //Recursive function to make sure that that date is never a weekend or FH
        function skip(cdate){
            day_count++
            var logic = _holidays['M'][moment(cdate).format('MM/DD')] || 
            _holidays['W'][moment(cdate).format('M/'+ (memorial || diff) +'/d')]
            var new_date = moment(cdate)
            var dow = new_date.day()
           
            //If the function goes more than 7 days then there is an error and it should be stopped
            if(day_count < 7){
                //if Saturday
                if(dow === 6 && !dateObject.weekend) {
                    c_date = moment(cdate).add(2, 'days')
                    //Check to see if new date is not a FH
                    skip(c_date)
                }else
                //if Sunday 
                if(dow === 0 && !dateObject.weekend) {
                    c_date = moment(cdate).add(1, 'days')
                    //Check to see if new date is not FH
                    skip(c_date)
                }else if(logic !== undefined && !dateObject.weekend) {
                    //if FH
                    c_date = moment(cdate).add(1, 'days')
                    // check to see if new date is not a weekend
                    skip(c_date)    
                }
            }
            
        }
        skip(c_date)
        return {
            date: moment(c_date).format(),
        }
        //*/        
    }
}
