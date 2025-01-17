// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import ProfileAvatar from '@widgets/ProfileAvatar';
import ProfileInfo from '@widgets/ProfileInfo';
import AccountSettings from '@widgets/AccountSettings';
import ChangePassword from '@widgets/ChangePassword';
import NotificationsSettings from '@widgets/NotificationsSettings';
import NotificationsSchedule from '@widgets/NotificationsSchedule';
import PaymentMethod from '@widgets/PaymentMethod';
import ProfileDescription from '@widgets/ProfileDescription';
import PrivacyPolicy from '@widgets/PrivacyPolicy';

const widgets = {

    payments: <PaymentMethod/>,
    privacy: <PrivacyPolicy/>,
    notifications_settings: <NotificationsSettings/>,
    notifications_schedule: <NotificationsSchedule/>,
    password: <ChangePassword/>
}

const CreateTournament = () => {
    return (
        <>
            <PageHeader title="Create Tournament" />
            <AppGrid id="settings" widgets={widgets}/>
        </>
    )
}

export default CreateTournament