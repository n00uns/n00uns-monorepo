import Manifesto from '../../components/Manifesto';
import { useAppSelector } from '../../hooks';

const ManifestoPage: React.FC = () => {
  const isCoolBackground = useAppSelector(state => state.application.isCoolBackground);
  const backgroundColor = isCoolBackground
    ? 'var(--brand-cool-background)'
    : 'var(--brand-warm-background)';

  return (
    <>
      <Manifesto
        backgroundColor={backgroundColor}
      />
    </>
  );
};
export default ManifestoPage;
