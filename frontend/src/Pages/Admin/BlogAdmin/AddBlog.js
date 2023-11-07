import React, {useState} from "react";
import BlogDetail from "./BlogDetail";
import ImageBlog from "./ImageBlog";
import BlogSummary from "./BlogSummary";
import CustomStepper from "../../../Components/Admin/CustomStepper";


function AddBlog() {
  const [formData, setFormData] = useState({
    title: '',
    fullText: '',
    image: []
  });

  const handleChange = (e) => {
    if (typeof e !== 'object'){
      setFormData({
        ...formData,
        fullText: e
      });
    } else{
      const {name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const [activeStep, setActiveStep ] = useState(0);
  const steps  = [
    { label: 'Add Blog Details'},
    { label: 'Upload Images'},
    { label: 'Finish'}
  ];

  const sectionComponent = () => {
    switch(activeStep) {
      case 0: return <BlogDetail formData={formData} handleChange={handleChange}/>;
      case 1: return <ImageBlog formData={formData} setFormData={setFormData}/>
      case 2: return <BlogSummary formData={formData} handleChange={handleChange}/>
      default: return null;
    }
  }

  return (
    <div className="container">
        <h3 className="mb-3">Add A New Blog</h3>
        <CustomStepper steps={steps}
        activeStep={activeStep}
        />
        {sectionComponent()}
        { (activeStep !== 0)
            && <button className="btn mt-3 me-2 previous" onClick={ () => setActiveStep(activeStep - 1) }>Previous</button>
        }
        { (activeStep !== steps.length - 1) && <button disabled={formData.title === "" || formData.content === ""} className="btn mt-3 ms-2 next" onClick={ () => setActiveStep(activeStep + 1) }>
          Next </button>
        }
       
    </div>
  )
}

export default AddBlog