// components/TagInput.js
import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const TagInput = ({ skills, onChange }) => {
  const [tags, setTags] = useState([]);

  const handleTagsChange = (tags) => {
    setTags(tags);
    onChange(tags);
  };

  return (
    <div className="tag-input ">
      <TagsInput
        className=" block p-2 pe-10 ps-10 text-md"
        value={tags}
        onChange={handleTagsChange}
        inputProps={{ placeholder: "Add a skills" }}
        addOnBlur={true}
      />
      <style jsx global>{`
         .tag-input {
          border: 2px solid #9ca3af;
          border-radius: 8px;
          display: inline-block;
          width: 100%;
        }
        .tag-input:hover{
          border: 2px solid #0891b2;
        }
        .tag-input-input::placeholder {
          font-size: 20px; /* Adjust the font size for the placeholder */
          color: #a0aec0; /* Adjust the color of the placeholder */
        }

        .tag-input-input {
          border: none;
          outline: none;
          width: 100%;
          padding: 8px;
        }

        .tag-input .react-tagsinput-tag {
          background-color: #fed7aa;
          color: #030712;
          border: 1px solid #f8fafc;
          border-radius: 20px;
          margin-right: 4px;
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default TagInput;
