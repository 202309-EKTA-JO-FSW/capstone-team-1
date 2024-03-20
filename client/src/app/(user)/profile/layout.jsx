import ProfileSidebar from "../../components/profile/profile-sidebar/ProfileSidebar";

const ProfileLayout = ({ children }) => {
  return (
    <section className="flex flex-col md:flex-row">
      <ProfileSidebar />
      {children}
    </section>
  );
};

export default ProfileLayout;
