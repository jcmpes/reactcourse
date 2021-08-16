import React from 'react';
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logowhite.png';
import styles from './Footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = ({ darkMode }) => {
  // const { t } = useTranslation(['global']);

  return (
    <footer className={styles.footer} data-theme={darkMode ? 'dark' : 'light'}>
      {/* <p>{t('footer.footer')}</p> */}
      <div className="footer-resposive">
        <div className="container bottom_border">
          <div className="row">
            <div className=" col-sm-4 col-md col-sm-4  col-12 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Find us</h5>

              <p className="mb10">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
              <p>
                <i className="fa fa-location-arrow"></i> 9878/25 sec 9 rohini 35{' '}
              </p>
              <p>
                <i className="fa fa-phone"></i> +91-9999878398{' '}
              </p>
              <p>
                <i className="fa fa fa-envelope"></i> info@example.com{' '}
              </p>
            </div>

            <div className=" col-sm-4 col-md  col-6 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>

              <ul className="footer_ul_amrc">
                <li>
                  <Link to="/">Image Rectoucing</Link>
                </li>
                <li>
                  <Link to="/">Clipping Path</Link>
                </li>

                <li>
                  <Link to="/">Hair Masking/Clipping</Link>
                </li>
                <li>
                  <Link to="/">Image Cropping</Link>
                </li>
                <li>
                  <section className="social mb-4">
                    <Link to="/">
                      <FacebookIcon />
                    </Link>

                    <Link to="/">
                      <InstagramIcon />
                    </Link>

                    <Link to="/">
                      <GitHubIcon />
                    </Link>

                    <Link to="/">
                      <LinkedInIcon />
                    </Link>
                  </section>
                </li>
              </ul>
            </div>
            <div className=" col-sm-4 col-md  col-6 col">
              <img className={styles.logo} src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
