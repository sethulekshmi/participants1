'use strict';
let simple_scenario = {
    'diamonds': [
        {
            'Date': '05/07/2016',
			'Timestamp': '08:05:02',
			'Diamondat': '2.0',
			'Cut': 'Point',
			'Colour': 'Blue',
			'Clarity': 'VVS1',
			'Polish': 'abr',
			'Symmetry': 'LHV',
			'Jewellerytype': 'ring',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Adwaith']
        },
        {
            'Date': '10/07/2016',
			'Timestamp': '10:10:05',
			'Diamondat': '2.0',
			'Cut': 'Crown_facet',
			'Colour': 'Pink',
			'Clarity': 'VS1',
			'Polish':'Brn_Dop',
			'Symmetry': 'CHV',
			'Jewellerytype': 'pendant',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Gaurav Singh']
        },
        {
            'Date': '28/07/2016',
			'Timestamp': '11:15:03',
			'Diamondat': '2.0',
			'Cut': 'Crown_facet',
			'Colour': 'Blue',
			'Clarity': 'SI1',
			'Polish': 'scr',
			'Symmetry': 'CV',
			'Jewellerytype': 'earrings',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Adwaith']
        }
    ]
};

let full_scenario = {
    'diamonds': [
        {
            'Date': '01/08/2016',
			'Timestamp': '09:05:20',
			'Diamondat': '2.0',
			'Cut': 'Table',
			'Colour': 'Colourless',
			'Clarity': 'VVS2',
			'Polish': 'abr',
			'Symmetry': 'GTV',
			'Jewellerytype': 'ring',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Gaurav Singh']
        },
        {
            'Date': '15/08/2016',
			'Timestamp': '07:45:10',
			'Diamondat': '5.0',
			'Cut': 'Point',
			'Colour': 'Blue',
			'Clarity': 'I1',
			'Polish': 'Brn_Dop',
			'Symmetry':'LPV',
			'Jewellerytype': 'pendant',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Amardev']
        },
        {
            'Date': '20/08/2016',
			'Timestamp': '13:20:20',
			'Diamondat': '2.0',
			'Cut': 'mazarin',
			'Colour': 'Blue',
			'Clarity': 'VS1',
			'Polish':'abr',
			'Symmetry':'CHV',
			'Jewellerytype': 'earrings',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Adwaith']
        },
        {
            'Date': '15/09/2016',
			'Timestamp': '23:10:05',
			'Diamondat': '1.0',
			'Cut': 'mazarin',
			'Colour': 'Pink',
			'Clarity': 'VS1',
			'Polish':'scr',
			'Symmetry':'CHV',
			'Jewellerytype': 'nose_pin',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Amardev']
        },
        {
           'Date': '12/10/2016',
			'Timestamp': '20:10:05',
			'Diamondat': '2.0',
			'Cut': 'Point',
			'Colour': 'Pink',
			'Clarity': 'VS2',
			'Polish':'Brn_Dop',
			'Symmetry': 'CV',
			'Jewellerytype': 'ring',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Adwaith']
        },
        {
            'Date': '20/10/2016',
			'Timestamp': '06:15:20',
			'Diamondat': '2.0',
			'Cut': 'Point',
			'Colour': 'Colourless',
			'Clarity': 'VVS1',
			'Polish': 'scr',
			'Symmetry':'GTV',
			'Jewellerytype': 'ring',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Gaurav Singh']
        },
        {
            'Date': '20/10/2016',
			'Timestamp': '18:05:02',
			'Diamondat': '5.0',
			'Cut': 'Point',
			'Colour': 'Blue',
			'Clarity': 'SI1',
			'Polish': 'abr',
			'Symmetry':'GTV',
			'Jewellerytype': 'pendant',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Gaurav Singh']
        },
        {
            'Date': '21/10/2016',
			'Timestamp': '19:45:23',
			'Diamondat': '5.0',
			'Cut': 'mazarin',
			'Colour': 'Pink',
			'Clarity': 'SI2',
			'Polish': 'Brn_Dop',
			'Symmetry': 'LPV',
			'Jewellerytype': "pendant",
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Amardev']
        },
        {
           'Date': '25/10/2016',
			'Timestamp':'20:10:20',
			'Diamondat': '2.0',
			'Cut': 'Table',
			'Colour': 'Blue',
			'Clarity': 'VS1',
			'Polish': 'abr',
			'Symmetry': 'CHV',
			'Jewellerytype': 'ring',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Adwaith']
        },
        {
			'Date': '10/11/2016',
			'Timestamp':'21:02:01',
			'Diamondat': '2.0',
			'Cut': 'Point',
			'Colour': 'Blue',
			'Clarity': 'VVS1',
			'Polish': 'scr',
			'Symmetry': 'CV',
			'Jewellerytype': 'bracelet',
			'Owners': ['Kollur','soham_industrial_diamonds','Beon_Group','Shah','Ajay_Gosh','Crayon_Bros_Ltd','Adora','Gaurav Singh']
        }
    ]
};


exports.simple = simple_scenario;
exports.full = full_scenario;
