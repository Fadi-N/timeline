import timelineLogo from '../../../public/img/timeline_logo_1.png';
export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src={timelineLogo}
            alt="logo"
        />
    );
}
