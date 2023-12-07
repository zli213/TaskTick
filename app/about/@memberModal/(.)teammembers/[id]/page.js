// (about/@memberModal/(.)teammembers/[id]/page)
import Frame from "../../../../../components/pages/About/widgets/Frame";
import Modal from "../../../../../components/pages/About/widgets/Modal";
import teamMembers from "../../../../../public/images/members";
import styles from "../../../../../styles/scss/teamMember.module.scss";

export default function MemberModal({ params: { id } }) {
  // transfer id to number
  const numericId = parseInt(id, 10);
  const person = teamMembers.find((p) => p.id === numericId);
  if (!person) {
    console.error("No team member found for id:", numericId);
    return <div>No member found</div>;
  }
  return (
    <Modal>
      <div className={styles.memberModal}>
        <Frame
          imageUrl={person.imageUrl}
          name={person.name}
          description={person.description}
        />
      </div>
    </Modal>
  );
}
