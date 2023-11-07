import {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    ArrowOne,
    ArrowTwo,
    ArrowThree,
    guideImg,
    weatherImg,
    customizationImg
    // ReviewOne,
    // ReviewTwo,
    // ReviewThree,
  } from "./HomeImg";

  const WorkData = [
    {
      img: StepOne,
      step: "1",
      content: "Choose Price Range",
      arrow: ArrowOne,
    },
    {
      img: StepTwo,
      step: "2",
      content: "Select Hotel",
      arrow: ArrowTwo,
    },
    {
      img: StepThree,
      step: "3",
      content: "Choose number of beds and guests",
      arrow: ArrowThree,
    },
    {
      img: StepFour,
      step: "4",
      content: "Check in & check out date",
    },
  ];

  const servicesData = [
    {
        imgUrl: weatherImg,
        title: 'Calculate Weather',
        desc: 'Welcome to heaven on earth'
    },
    {
        imgUrl: guideImg,
        title: 'Best Tour Guide',
        desc: 'Arrive as guests, leave as friends'
    },
    {
        imgUrl: customizationImg,
        title: 'Customization',
        desc: 'Whisper your dreams to us.'
    },
  ];
  
  const quoteNewsData =[
     "It’s not the destination, it's the journey.",
     "All he needed was a wheel in his hand and four on the road.",
     "Roads were made for journeys, not destinations.",
     "You may not find a path, but you will find a way.",
     "People don’t take trips, trips take people.",
     "Take care of your car in the garage, and the car will take care of you on the road.",
     "Roads are a record of those who have gone before.",
     "A road trip is a way for the whole family to spend time together and annoy each other in interesting and new places",
     "Good company in a journey makes the way seem shorter.",
     "Driving at night is about communicating with lights",
     "If you don’t know where you are going, any road will get you there.",
     "The only impossible journey is the one you never begin",
     "Wherever you get to is better than where you started. To stay on the road is a massive achievement.",
     "I take to the open road. Healthy, free, the world before me.",
     "Look at life through the windshield, not the rearview mirror.",
     "The open road is there, it will always be there. You just have to decide when to take it.",
     "You Can’t Find The Right Roads When The Streets Are Paved.",
     "The gladdest moment in human life, me thinks,  is a departure into unknown lands.",
     "If you come to a fork in the road, take it",
     "Discovery consists not in seeking new landscapes, but in having new eyes.",
     "A journey is a person in itself; no two are alike. And all plans, safeguards, policing, and coercion are fruitless."
  ];

  const facilitiesData = [
    {
      id: 1,
      content: 'Airport transfer'
    },
    {
      id: 2,
      content: 'Car park'
    },
    {
      id: 3,
      content: 'Check-in [24-hour]'
    },
    {
      id: 4,
      content: 'Free Wi-Fi in all rooms!'
    },
    {
      id: 5,
      content: 'Kitchen'
    }
  ]

  export {WorkData, servicesData, quoteNewsData}
