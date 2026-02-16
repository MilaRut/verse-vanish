import React, { useState } from "react";

export const PoemForm = ({ onPoemSubmit, hasPoem }) => {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    text: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPoemSubmit(formData.author, formData.title, formData.text);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  if (hasPoem) return null;
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Укажите автора стихотворения</span>
        <input id="author" value={formData.author} onChange={handleChange} />
      </label>
      <label>
        <span>Укажите название стихотворения</span>
        <input id="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        <span>Введите текст стихотворения</span>
        <textarea
          id="text"
          cols="50"
          rows="10"
          value={formData.text}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
};
