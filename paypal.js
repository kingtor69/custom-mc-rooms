/*
** this is being deployed manually with manual version management
** this code last updated 20211221-1646mst
*/
PayPal.Donation.Button({
    env:'production',
    hosted_button_id:'VADQMNN44T4EN',
    image: {
    src:'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
    alt:'Donate with PayPal button',
    title:'PayPal - The safer, easier way to pay online!',
    }
    }).render('#donate-button');
