import { fireEvent, render, screen } from '@testing-library/react';
import { AssetImage } from './AssetImage';

describe('AssetImage', () => {
  it('rend une image optimisée avec dimensions et chargement différé', () => {
    render(<AssetImage src="/assets/operator.webp" alt="Portrait classifié d’A7" label="A7" variant="operator" />);
    const image = screen.getByRole('img',{name:'Portrait classifié d’A7'});
    expect(image).toHaveAttribute('loading','lazy');
    expect(image).toHaveAttribute('width','1024');
    expect(image).toHaveAttribute('height','1536');
  });

  it('revient au schéma technique si le média échoue', () => {
    render(<AssetImage src="/assets/missing.webp" alt="Visuel absent" label="NX5-00 OMBRE" variant="armor" />);
    fireEvent.error(screen.getByRole('img',{name:'Visuel absent'}));
    expect(screen.getByRole('img',{name:/Illustration technique temporaire : NX5-00 OMBRE/})).toBeInTheDocument();
  });
});
