    // GA
    import ReactGA from 'react-ga4';
    import { DndProvider } from 'react-dnd';
    import { HTML5Backend } from 'react-dnd-html5-backend';
    // utils
    import {lazy, Suspense} from 'react';

    // styles
    import ThemeStyles from '@styles/theme';
    import './style.scss';
    
    
    // libs styles
    import 'react-toastify/dist/ReactToastify.min.css';
    import 'react-grid-layout/css/styles.css';
    import 'swiper/css';
    import 'swiper/css/effect-fade';
    import 'swiper/css/pagination';

  

    // fonts
    import '@fonts/icomoon/icomoon.woff';

    // contexts
    import {SidebarProvider} from '@contexts/sidebarContext';
    import {ThemeProvider} from 'styled-components';

    // hooks
    import {useThemeProvider} from '@contexts/themeContext';
    import {useEffect, useRef} from 'react';
    import {useWindowSize} from 'react-use';
    import useAuthRoute from '@hooks/useAuthRoute';

    // utils
    import {StyleSheetManager} from 'styled-components';
    import {ThemeProvider as MuiThemeProvider, createTheme} from '@mui/material/styles';
    import {preventDefault} from '@utils/helpers';
    import rtlPlugin from 'stylis-plugin-rtl';
    import {CacheProvider} from '@emotion/react';
    import createCache from '@emotion/cache';

    // components
    import {Route, Routes} from 'react-router-dom';
    import {ToastContainer} from 'react-toastify';
    import LoadingScreen from '@components/LoadingScreen';
    import Sidebar from '@layout/Sidebar';
    import BottomNav from '@layout/BottomNav';
    import Navbar from '@layout/Navbar';
    import ShoppingCart from '@widgets/ShoppingCart';
    import ScrollToTop from '@components/ScrollToTop';
import MatchResult from '@pages/Results/MatchResult';
import AgentScore from '@pages/Results/AgentScore';

    // pages
    const ClubSummary = lazy(() => import('@pages/ClubSummary'));
    const GameSummary = lazy(() => import('@pages/GameSummary'));
    const Championships = lazy(() => import('@pages/Championships'));
    const CreateTournament = lazy(() => import('@pages/CreateTournament'));
    const LeagueOverview = lazy(() => import('@pages/LeagueOverview'));
    const FansCommunity = lazy(() => import('@pages/FansCommunity'));
    const Statistics = lazy(() => import('@pages/Statistics'));
    const PageNotFound = lazy(() => import('@pages/PageNotFound'));
    const MatchSummary = lazy(() => import('@pages/MatchSummary'));
    const MatchOverview = lazy(() => import('@pages/MatchOverview'));
    const PlayerProfile = lazy(() => import('@pages/PlayerProfile'));
    const Schedule = lazy(() => import('@pages/Schedule'));
    const Tickets = lazy(() => import('@pages/Tickets'));
    const FootballStore = lazy(() => import('@pages/FootballStore'));
    const BrandStore = lazy(() => import('@pages/BrandStore'));
    const Product = lazy(() => import('@pages/Product'));
    const Login = lazy(() => import('@pages/Login'));
    const SignUp = lazy(() => import('@pages/SignUp'));
    const Settings = lazy(() => import('@pages/Settings'));
    
// Refree Routes
    const RealTime = lazy(() => import('@pages/Refree/RealTime'));
    const MatchList = lazy(() => import('@pages/Refree/MatchList'));
    const Test = lazy(() => import('@pages/Refree/Test'));

// Admin Routes
    const Organizer = lazy(() => import('@pages/Admin/Organizer'));
    const Coach = lazy(() => import('@pages/Admin/Coach'));
    const Referee = lazy(() => import('@pages/Admin/Referee'));
    const Player = lazy(() => import('@pages/Admin/Player'));
    const Team = lazy(() => import('@pages/Admin/Team'));
    const Complaints = lazy(() => import('@pages/Admin/Complaints'));


 // Payment Routes
    const PaymentAdmin = lazy(() => import('@pages/Payment/PamyentAdmin'));
    const PaymentOrganizer = lazy(() => import('@pages/Payment/PaymentOrganizer'));
    const PaymentSucess = lazy(() => import('@pages/Payment/SuccessPayment'));
    const CancelPayment = lazy(() => import('@pages/Payment/CancelPayment'));

// Team Routes

    const CreateTeam = lazy(() => import('@pages/Team/CreateTeam'));
    const TeamList = lazy(() => import('@pages/Team/TeamList'));

// Complaint Routes

const Complaint = lazy(() => import('@pages/Complaint/Complaint'));
const AboutUs = lazy(() => import('@pages/Complaint/AboutUs'));



 





    const App = () => {
        const appRef = useRef(null);
        const {theme, direction} = useThemeProvider();
        const {width} = useWindowSize();
        const isAuthRoute = useAuthRoute();

        // Google Analytics init
        const gaKey = process.env.REACT_APP_PUBLIC_GA;
        gaKey && ReactGA.initialize(gaKey);

        // auto RTL support for Material-UI components and styled-components

        const plugins = direction === 'rtl' ? [rtlPlugin] : [];

        const muiTheme = createTheme({
            direction: direction,
        });

        const cacheRtl = createCache({
            key: 'css-rtl',
            stylisPlugins: plugins,
        });

        useEffect(() => {
            // scroll to top on route change
            appRef.current && appRef.current.scrollTo(0, 0);

            preventDefault();
        }, []);

        return (
            <CacheProvider value={cacheRtl}>
                <MuiThemeProvider theme={muiTheme}>
                    <SidebarProvider>
                        <ThemeProvider theme={{ theme: theme }}>
                            <ThemeStyles />
                            <ToastContainer theme={theme} autoClose={2500} position={direction === 'ltr' ? 'top-right' : 'top-left'} />
                            <StyleSheetManager stylisPlugins={plugins}>
                                <div className={`app ${isAuthRoute ? 'fluid' : ''}`} ref={appRef}>
                                    <ScrollToTop />
                                    {!isAuthRoute && (
                                        <>
                                            <Sidebar />
                                            {width < 768 && <Navbar />}
                                            {width < 768 && <BottomNav />}
                                        </>
                                    )}
                                    <div className="app_container">
                                        <div className="app_container-content d-flex flex-column flex-1">
                                            <Suspense fallback={<LoadingScreen />}>
                                                <Routes>
                                                    <Route path="*" element={<PageNotFound/>}/>
                                                    <Route path="/" element={<ClubSummary/>}/>
                                                    <Route path="/game-summary" element={<GameSummary/>}/>
                                                    <Route path="/championships" element={<Championships/>}/>
                                                    <Route path="/create-tournament" element={<CreateTournament/>}/>
                                                    <Route path="/league-overview" element={<LeagueOverview/>}/>
                                                    <Route path="/fans-community" element={<FansCommunity/>}/>
                                                    <Route path="/statistics" element={<Statistics/>}/>
                                                    <Route path="/match-summary" element={<MatchSummary/>}/>
                                                    <Route path="/match-overview" element={<MatchOverview/>}/>
                                                    <Route path="/player-profile" element={<PlayerProfile/>}/>
                                                    <Route path="/schedule" element={<Schedule/>}/>
                                                    <Route path="/tickets" element={<Tickets/>}/>
                                                    <Route path="/football-store" element={<FootballStore/>}/>
                                                    <Route path="/brand-store" element={<BrandStore/>}/>
                                                    <Route path="/product" element={<Product/>}/>
                                                    <Route path="/login" element={<Login/>}/>
                                                    <Route path="/sign-up" element={<SignUp/>}/>
                                                    <Route path="/settings" element={<Settings/>}/>
                                                    
                                                    // Refree routes
                                                    <Route path="/realtime" element={<RealTime/>}/>
                                                    <Route path="/match-list" element={<MatchList/>}/>
                                                    <Route path="/test" element={<Test/>}/>

                                                    //Result Routes
                                                    <Route path="/match" element={<MatchResult/>}/>
                                                    <Route path="/agent" element={<AgentScore/>}/>

                                                    // Admin Routes
                                                    <Route path="/organizer-list" element={<Organizer/>}/>
                                                    <Route path="/coach-list" element={<Coach/>}/>
                                                    <Route path="/refree-list" element={<Referee/>}/>
                                                    <Route path="/player-list" element={<Player/>}/>
                                                    <Route path="/team-list" element={<Team/>}/>
                                                    <Route path="/complaint-list" element={<Complaints/>}/>



                                                    // Payment Routes
                                                    <Route path="/payment-list" element={<PaymentAdmin/>}/>
                                                    <Route path="/payment" element={<PaymentOrganizer/>}/>
                                                    <Route path="/payment/checkout-success" element={<PaymentSucess/>}/>
                                                    <Route path="/payment/checkout-cancel" element={<CancelPayment/>}/>


                                                    // Team Routes
                                                    <Route path="/create-team" element={<CreateTeam/>}/>
                                                    <Route path="/team-list" element={<TeamList/>}/>

                                                    // Complaint Routes
                                                    <Route path="/complaint" element={<Complaint/>}/>
                                                    <Route path="/about-us" element={<AboutUs/>}/>












                                                </Routes>
                                        </Suspense>
                                    </div>
                                </div>
                                <ShoppingCart isPopup />
                            </div>
                        </StyleSheetManager>
                    </ThemeProvider>
                </SidebarProvider>
            </MuiThemeProvider>
        </CacheProvider>
    );
}

    export default App
