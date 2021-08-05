import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import { getUi } from '../../../store/selectors';
import Layout from '../../layout/Layout';
import { Button } from '../../shared';
import CourseDetail from './CourseDetail';

import StripeCheckout from 'react-stripe-checkout';
require('dotenv').config();

function CoursePage() {
  const { courseSlug } = useParams();
  const { loading } = useSelector(getUi);
  const [course, setCourse] = useState();

  React.useEffect(() => {
    const fetchData = async () => {
      setCourse(await getCourse(courseSlug));
    };
    fetchData();
  }, [courseSlug]);

  const makePayment = token => {
    const body = {
      token,
      course,
    }
    const headers = {
      "Content-Type": "application/json"
    }
    console.log('COURSE: ', course)
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE: ", response);
      const {status} = response
      console.log("STATUS: ", status);
    }).catch( err => console.log(err))

  }

  return (
    <Layout>
      <div className="course-detail-page">
        {loading && "I'm loading..."}
        {course && (
          <>
            <CourseDetail {...course} />
            <div className="lesson-nav">
              {course.lessons.length > 0 ? (
                <Link to={`/courses/${courseSlug}/${course.lessons[0].slug}`}>
                  <Button>Go to course</Button>
                </Link>
              ) : null}
            </div>
            <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
              token={makePayment}
              name={course.title}
              amount={course.price * 100}
            >
              <button className="btn-large pink">
                Buy for {course.price}$
              </button>
            </StripeCheckout>
          </>
        )}
      </div>
    </Layout>
  );
}

export default CoursePage;
