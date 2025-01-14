import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Tabs, TabsList } from '@mui/base';
import Spring from '@components/Spring';
import axios from 'axios';
import classNames from 'classnames';
import TabButton from '@ui/TabButton';
import { useWindowSize } from 'react-use';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComplaintSettings = () => {
  const [activeTab, setActiveTab] = useState('Complaint');
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { width } = useWindowSize();

  const handleComplaintSubmit = async () => {
    try {
      const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${userEmail}`);
      const userId = userResponse.data._id;

      const response = await axios.post('http://localhost:3000/api/complaints', {
        userId,
        title: complaintTitle,
        description: complaintDescription,
      });

      console.log('Complaint submitted successfully:', response.data);
      setComplaintTitle('');
      setComplaintDescription('');

      toast.success('Complaint submitted successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error submitting complaint:', error.message);
      
      toast.error(`Error submitting complaint: ${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Spring className="card d-flex flex-column card-padded">
      <div className="d-flex flex-column justify-content-between flex-1">
        <Tabs value={activeTab}>
          <TabsList className={`${styles.tabs_list} tab-nav `}>
            <TabButton
              title={width >= 375 ? ' Complaint' : 'Complaint'}
              onClick={() => setActiveTab('Complaint')}
              active={activeTab === 'Complaint'}
            />
          </TabsList>

          <form className="d-flex flex-column ">
            <div className={styles.row}>
              <input
                className={classNames('field')}
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className={classNames('field')}
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className={styles.row}>
              <input
                className={classNames('field')}
                type='text'
                placeholder='Complaint Title'
                value={complaintTitle}
                onChange={(e) => setComplaintTitle(e.target.value)}
              />
            </div>
            <textarea
              className={classNames('field')}
              placeholder='Complaint Description'
              value={complaintDescription}
              onChange={(e) => setComplaintDescription(e.target.value)}
            />
            <div className={styles.footer}>
              <button className="btn" type="button" onClick={handleComplaintSubmit}>
                Submit Complaint
              </button>
              <button className="btn btn--outlined" type="reset">
                Cancel
              </button>
            </div>
          </form>
        </Tabs>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Spring>
  );
};

export default ComplaintSettings;
