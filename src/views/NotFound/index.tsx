// views/NotFound.tsx
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>404 - Página não encontrada</h1>
        <p>Desculpe, não conseguimos encontrar a página que você está procurando.</p>
        <Link to="/">Voltar para a página inicial</Link>
    </div>
);

export default NotFound;
