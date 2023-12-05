import {createContext, useState} from "react";
export const PrevFilterContext = createContext();

function PrevFilterProvider({children}){
     const [prevName, setPrevName] = useState(null);
     const [prevRate, setPrevRate] = useState(null);
     const [prevSearch, setPrevSearch] = useState(null);
     const [selectedRadio, setSelectedRadio] = useState(null);
     const [selectedDrop, setSelectedDrop] = useState("Featured");
     const [nameActive, setNameActive] = useState(null);

     const handlePrevious =(type, value) =>{
        switch(type){
            case "name":
                setPrevName(value);
                setPrevRate(null);
                setSelectedDrop("Featured");
                break;
            case "rate":
                setPrevRate(value);
                setSelectedRadio(null);
                setSelectedDrop("Featured");
                break;
            case "sort":
                setPrevRate(null);
                setSelectedRadio(null);
                setSelectedDrop("Featured");
                break;
            case "drop":
                setSelectedDrop(value);
                break;
            default:
                break;
            
        };

        return {
            prevName,
        
            prevRate,
            prevSearch,
            selectedRadio,
            selectedDrop,
            nameActive,
            setPrevName,
            setPrevRate,
            setPrevSearch,
            setSelectedRadio,
            setSelectedDrop,
            setNameActive,
          };
     };

     return (
        <PrevFilterContext.Provider value={{handlePrevious}}>
            {children}
        </PrevFilterContext.Provider>
     )
};

export default PrevFilterProvider;