import type { NextPage } from 'next';
import Avatar from 'boring-avatars';
import { Key, useState } from 'react';
import styles from '../styles/Home.module.css';

type Variants = 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';
const variants: any = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'];

type HEX = `#${string}`;
const colors: HEX[] = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];

const Index: NextPage = () => {
  const [name, setName] = useState<string>('Johnny');
  const [selectedVariant, setSelectedVariant] = useState<Variants>('beam');

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.avatar}>
          <Avatar
            size={100}
            name={name}
            variant={selectedVariant}
            colors={colors}
          />
        </div>
        <div>
          <h2>Colors</h2>
          <h2>Variant</h2>
          {variants.map((item: any) => (
            <label key={item} className={styles.label}>
              {item}
              <input
                type="radio"
                name={name}
                value={selectedVariant}
                checked={item === selectedVariant}
                onChange={() => setSelectedVariant(item)}
              />
            </label>
          ))}
        </div>
        <div className={styles.form}>
          <h2 className={styles.title}>Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
