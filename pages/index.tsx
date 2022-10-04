import type { NextPage } from 'next';
import Avatar from 'boring-avatars';
import { useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/Home.module.css';

type Variants = 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';
const variants: Variants[] = [
  'beam',
  'marble',
  'pixel',
  'sunset',
  'ring',
  'bauhaus',
];

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
          <div className={styles.colors}>
            {colors.map((color) => (
              <div
                key={color}
                className={styles.color}
                style={{ backgroundColor: `${color}` }}
              ></div>
            ))}
          </div>
          <h2>Variant</h2>
          <div>
            {variants.map((item: Variants) => (
              <label
                key={item}
                className={clsx([
                  styles.label,
                  item === selectedVariant && styles.isSelected,
                ])}
              >
                {item}
                <input
                  type="radio"
                  name={name}
                  value={selectedVariant}
                  checked={item === selectedVariant}
                  onChange={() => setSelectedVariant(item)}
                  className={styles.radioButton}
                />
              </label>
            ))}
          </div>
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
