//constant_bootstrap.js
//fills our collections with constant data when the server starts (and if our collections don't have any data)

seed_constants= function(){
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //programmes
  Seed( 'Programmes', {
    data: [
      {programmeName: "Multi"},
      {programmeName: "Full-time"},
      {programmeName: "Part-time"},
      {programmeName: "Accelerated"},
      {programmeName: "Erasmus"},
      {programmeName: "PgDip"}
    ]
  });

  programmesArray= [];
  Programmes.find({}).map(function(o){
    programmesArray.push(o._id);
  });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //cohorts
    Seed( 'Cohorts', {
      data: [
        {cohortYear: 2011},
        {cohortYear: 2012},
        {cohortYear: 2013},
        {cohortYear: 2014},
        {cohortYear: 2015},
        {cohortYear: 2016},
        {cohortYear: 2017},
        {cohortYear: 2018},
        {cohortYear: 2019}
      ]
    });

    cohortsArray= [];
    Cohorts.find({}).map(function(o){
      cohortsArray.push(o._id);
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Themes
    Seed( 'Themes', {
      data: [
        {themeName: "Assessment"},
        {themeName: "Elective"},
        {themeName: "Evaluation"},
        {themeName: "Integration 1"},
        {themeName: "Integration 2"},
        {themeName: "Intervention"},
        {themeName: "Intervention & Evaluation"},
        {themeName: "Planning"}
      ]
    });

    themesArray= [];
    Themes.find({}).map(function(o){
      themesArray.push(o._id);
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Seed( 'Themetypes', {
      data: [
        {
          name: "Accident & Emergency",
          code: "A&E",
          type: "Physical settings"
        },
        {
          name: "Artificial Limbs and Appliance Service e.g. Wheelchairs, Posture & Mobility equipment, limb fitting",
          code: "ALAS",
          type: "Specialist Services"
        },
        {
          name: "Acute Mental Health e.g. acute psychiatry, assessment wards, Psychiatric ICU (Adult)",
          code: "AMH",
          type: "Mental Health Settings"
        },
        {
          name: "Acute Physical  e.g. medical, acute admissions, assessment wards, cardiology unit (Adult)",
          code: "AP",
          type: "Physical settings"
        },
        {
          name: "Burns & Plastics, e.g. plastic surgery, burns splinting, scar management",
          code: "B&P",
          type: "Specialist Services"
        },
        {
          name: "Child & Adolescent Mental Health Service, e.g. Aspergers, challenging behaviour",
          code: "CAMHS",
          type: "Children's Services"
        },
        {
          name: "Community Mental Health Team (Adult), Intensive Support team, Vulnerable People Services",
          code: "CMHT",
          type: "Mental Health Settings"
        },
        {
          name: "Community Physical, e.g. community hospital, community physical elderly (Adult), Crisis Intervention, Enhanced Care, Pulmonary Outreach, Cardiac Services",
          code: "CP",
          type: "Physical Settings"
        },
        {
          name:"Drug and alcohol Service, Addictions",
          code: "DA",
          type: "Mental Health Settings"
        },
        {
          name:"Eating Disorders",
          code: "EA",
          type: "Mental Health Settings"
        },
        {
          name: "Education and Training",
          code: "E&T"
        },
        {
          name: "Elderly Care Assessment Service",
          code: "ECAS"
        },
        {
          name: "Forensic Mental Health Service or Prison Service, Secure Unit",
          code: "FMH",
          type: "Mental Health Settings"
        },
        {
          name: "GP practice / surgeries",
          code:"GP",
          type:"Other"
        },
        {
          name:"Housing",
          code: "H",
          type: "Social Services / Community Services"
        },
        {
          name: "Hand Therapy, e.g. hand rehab, splinting",
          code: "HT",
          type: "Specialist Services"
        },
        {
          name: "Inter-Agency e.g. split placement in S.S. and health sector",
          code: "IA",
          type: "Other"
        },
        {
          name: "Intermediate Care",
          code: "IC",
          type:"Physical Settings"
        },
        {
         name: "Learning Disabilities e.g. hospital or community based, (Adult and paediatric)",
         code: "LD",
         type: "Specialist Services"
        },
        {
          name: "Management Placement",
          code: "M",
          type: "Other"
        },
        {
          name:"Memory service",
          code: "MS",
          type: "Mental Health Settings"
        },
        {
          name: "Mental Health Day Hospital (Adult and Older Adult)",
          code: "MHDH",
          type: "Mental Health Settings"
        },
        {
          name: "Neurology e.g. stroke unit, CVA, spinal unit, ABI, neuro rehab",
          code: "N",
          type: "Specialist Services"

        },
        {
          name: "Oncology, e.g. cancer care",
          code: "O",
          type: "Specialist Services"

        },
        {
          name:"Older adult – in patient, rehab",
          code:"OA",
          type:"Physical settings"
        },
        {
          name: "Outpatients",
          code: "OP",
          type: "Other"
        },
        {
          name: "Overseas / International",
          code: "OI",
          type: "Other"
        },
        {
          name: "Paediatrics e.g. school, children centre",
          code: "P",
          type: "Children's Services"
        },
        {
          name: "Palliative Care e.g. hospice, Macmillan",
          code: "PC",
          type: "Specialist Services"

        },
        {
          name: "Physical Day Hospital (Adult and Older Adult)",
          code: "PDH",
          type: "Physical Settings"
        },
        {
          name: "Pain Management",
          code: "PM",
          type: "Specialist Services"

        },
        {
          name: "Psychiatry Old Age e.g. EMI, Dementia care, Older adult in-patient mental health",
          code: "POA",
          type: "Mental Health Settings"
        },
        {
          name: "Private Practice",
          code: "PP",
          type: "Other"
        },
        {
          name: "Rheumatology",
          code: "R",
          type: "Specialist Services"

        },
        {
          name: "Rehab Physical e.g. medical rehab, pulmonary rehab, cardiac rehab, (Adult)",
          code: "RP",
          type: "Physical settings"
        },
        {
          name: "Residential setting",
          code: "RE",
          type: "Other"
        },
        {
          name: "Role Emerging Placement e.g. asylum seekers, outdoors activity centre, charities / 3rd sector",
          code: "REP",
          type:"Other"
        },
        {
          name: "Rehab Mental Health e.g. Long term mental health, (Adult)",
          code: "RMH",
          type: "Mental Health Settings"

        },
        {
          name: "Reablement Team (Adult)",
          code: "RT",
          type: "Social Services / Community Services"
        },
        {
          name: "Surgical e.g. Amputation, vascular surgery, general surgery ",
          code: "S",
          type: "Specialist Services"

        },
        {
          name: "Social Services, e.g. equipment and adaptations, community based assessments (Adult and paediatric)",
          code: "SS",
          type: "Social Services / Community Services"
        },
        {
          name: "Telecare and assistive technology",
          code:"T",
          type: "Social Services / Community Services"
        },
        {
          name: " Trauma and Orthopaedics e.g. fractures, elective hip and knee surgery",
          code: "T&O",
          type: "Specialist Services"

        },
        {
          name: "Veterans e.g. Combat Stress",
          code: "V",
          type: "Other"
        },
        {
          name: "Vocational Rehabilitation ",
          code: "VR",
          type: "Other"
        }
      ]
    });

    themetypesArray= [];
    Themetypes.find({}).map(function(o){
      themetypesArray.push(o._id);
    });

}
