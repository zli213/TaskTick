// (about/@memberModal/(.)teammembers/[id]/page)
import Frame from "../../../../../components/pages/About/widgets/Frame";
import Modal from "../../../../../components/pages/About/widgets/Modal";
import teamMembers from "../../../../../public/images/members";
import styles from "../../../../../styles/scss/teamMember.module.scss";

export default function MemberModal({ id }) {
  const person = teamMembers.find((person) => person.id === id);

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
