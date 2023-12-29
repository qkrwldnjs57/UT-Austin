
import React, { useState } from 'react';
import { Space, Tag } from 'antd';
const { CheckableTag } = Tag;
const tagsData = ['Tough Grader', 'So Many Paper', 'Caring', 'Gives Good Feedback','Beware of Pop Quizzes','Online Savvy','Extra Credit','Super Fun'];


// Import all the needed components
import {Form,Radio,Select,Rate,Button,Input} from 'antd';

// This is used for texat area input 
const { TextArea } = Input;

// This is used for rating 
const desc = ['terrible', 'bad', 'normal', 'good', 'awesome'];


// Here starts the review page
const Review = () => {

  // This is used for tags
  const [selectedTags, setSelectedTags] = useState(['Books']);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  // This is used for Rating 
  const [value, setValue] = useState(0);

  function Click() {
    alert("success");

  }


  
   
 
 

  return (
    <>
      <Form 
       
        labelCol={{
          span: 44,
        }}
        wrapperCol={{
          span: 44,
        }}

        layout="horizontal"
  
        style={{
          maxWidth: 800,
        }}
      >
      
      {/* Form here onwards is the form interactive items */}
        <h1>Rate for Philip Doty</h1>
        <Form.Item>
        <h2>Rate this professor on overall.</h2>
          <span>
          <Rate id="rate_overall" tooltips={desc} onChange={setValue} value1={value} />
          {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
          </span>
        </Form.Item>
        
        
        <Form.Item>
        <h2>How difficult was this professor?</h2>
          <span>
          <Rate id="rate_difficult" tooltips={desc} onChange={setValue} value2={value} />
          {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
          </span>
        </Form.Item>
        
        
        <Form.Item>
        <h2>Select grade received</h2>
          <Select placeholder="Select a grade"
            id="select_grade">
  
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
            <Select.Option value="C">C</Select.Option>
            <Select.Option value="D">D</Select.Option>
            <Select.Option value="F">F</Select.Option>
            <Select.Option value="Q-dropped">Q-dropped</Select.Option>
          </Select>
        </Form.Item>

        
        <Form.Item>
        <h2>Did this professor use textbook?</h2>
          <Radio.Group id="textbook">
            <Radio value="yes"> Yes </Radio>
            <Radio value="no"> No </Radio>
          </Radio.Group>
        </Form.Item>

        
        <Form.Item>
        <h2>What attendance mandatory?</h2>
          <Radio.Group id="attendance"> 
            <Radio value="yes"> Yes </Radio>
            <Radio value="no"> No </Radio>
          </Radio.Group>
        </Form.Item>
        
      
      <Form.Item>
      <h2>Select up to 3 tags</h2>
        <Space size={[0, 8]} wrap>
          {tagsData.map((tag) => (
            <CheckableTag
              id="tags"
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </Space>
      </Form.Item>

  
      
      <Form.Item>
      <h2>Write a review</h2>
          <TextArea showCount
          id = "text"
          maxLength={100}
          style={{ height: 120, resize: 'none' }}
          placeholder="what do you want other students to know about this professor?" />
      </Form.Item>
      
      {/* End of the from */}
      </Form>

      <Button onClick={Click}>Submit</Button>
        

    </>
  );
};

export default Review;


// 1. the rating part is not working exactly 
// 2. need to create a page that shows up after I click submit
// 3. need to fix the css part 


