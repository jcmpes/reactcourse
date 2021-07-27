import React from 'react';
import { useTranslation } from "react-i18next";
import { FormField, Button, Input } from "../../../components/shared"
import FileUpload from '../../shared/FileUpload'

function NewLessonForm({ onSubmit, lessonCounter, setLessonCounter, courseDetails, setCourseDetails }) {
  const { t } = useTranslation(['global']);
  const [image, setImage] = React.useState(null)

  const handleChange = (ev) => {
    setCourseDetails((oldDetails) => {
      const lessons = [ ...oldDetails.lessons ]
      lessons[lessonCounter][ev.target.name] = ev.target.value;
      return {
        ...oldDetails,
        lessons
      }
      // ...oldDetails,
      // lessons: [...oldDetails.lessons,
      //   oldDetails.lessons.forEach(
      //   (item, index) => {
      //     if(index === lessonCounter) {
      //       // item[ev.target.name] = ev.target.value;
      //     }
      //     return
      //   })
      //   // [ev.target.name]: ev.target.value,
      // ]
    });

  };

  const handleAddLesson = () => {
    setLessonCounter(lessonCounter + 1);
    setCourseDetails(oldDetails => ({
      ...oldDetails,                // Copy al the other key value pairs of onject
      lessons: [...oldDetails.lessons,
              {
                "number": lessonCounter,
                "title": 'New lesson',
                "description": '',
                "video": '',
                "content": '',
                "image": ''
              }]
    
    }))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('title', courseDetails.lessons[lessonCounter].title)
    formData.append('description', courseDetails.lessons[lessonCounter].description)
    formData.append('category', courseDetails.lessons[lessonCounter].category)
    formData.append('video', courseDetails.lessons[lessonCounter].video)
    formData.append('content', courseDetails.lessons[lessonCounter].content)
    if (image) formData.append('image', image)
    onSubmit(formData)
  };

  return (
    <div className="new-lesson-form">
      <h2>{t('course.create lesson') + ' ' + lessonCounter }</h2>
      <div className="lessonForm">
        <form>
          <FormField
            type="text"
            label={'title'}
            name="title"
            value={courseDetails.lessons[lessonCounter].title}
            onChange={handleChange}
          />
          {/* <Input
            as="select"
            label={'category'}
            name="category"
            value={lessonDetails.category}
            onChange={handleChange}
            options={[{ name: 'Select category', _id: '000' }, ...categories]}
          /> */}
          <FormField
            type={"text"}
            label={'description'}
            name="description"
            value={courseDetails.lessons[lessonCounter].description}
            onChange={handleChange}
          />
          <FormField
            type={"text"}
            label={'video'}
            name="video"
            value={courseDetails.lessons[lessonCounter].video}
            onChange={handleChange}
          />
          <FormField
            type={"textarea"}
            label={'content'}
            name="content"
            value={courseDetails.lessons[lessonCounter].content}
            onChange={handleChange}
          />
          <FileUpload
            label={'image'}
            image={image}
            setImage={setImage}
          />
          {/* <div className="lessons-navigate">
            <button onClick={() => setLessonCounter(lessonCounter - 1)}>Previous Step</button>
            <button onClick={handleAddLesson}>Add a lesson</button>
          </div> */}
          {/* <Button
            type="submit"
          >
            {t('course.save course')}
          </Button> */}
        </form>
      </div>
    </div>
  )
}



export default NewLessonForm;