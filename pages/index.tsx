import type { NextPage } from 'next';
import { useEffect } from 'react';
import clsx from 'clsx';
import styles from '../styles/Home.module.css';
import { FaRandom } from 'react-icons/fa';
import { useMicrocms } from '../hooks/useMicrocms';
import { useAvatar } from '../hooks/useAvatar';

export type Variants =
  | 'marble'
  | 'beam'
  | 'pixel'
  | 'sunset'
  | 'ring'
  | 'bauhaus';
const variants: Variants[] = [
  'beam',
  'marble',
  'pixel',
  'sunset',
  'ring',
  'bauhaus',
];

export type HEX = `#${string}`;

const Index: NextPage = () => {
  const [data, setData, submitData] = useMicrocms();
  const [
    mounted,
    name,
    selectedVariant,
    colors,
    handleSelectVariant,
    handleRandomPalette,
    handleInputName,
    makeColorCodes,
  ] = useAvatar(data);

  const handleSubmit = () => {
    const iconSize = 100;
    const imageUrl = `https://source.boringavatars.com/${selectedVariant}/${iconSize}/${encodeURI(
      name
    )}?colors=${makeColorCodes(colors)}`;

    submitData({
      imageUrl,
      name,
      variant: selectedVariant,
      colors,
    });
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, selectedVariant, colors[0]]);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {mounted && (
          <div className={styles.avatar}>
            <img
              src={
                (data && data.imageUrl) ||
                `https://source.boringavatars.com/${selectedVariant}/100/${name}?colors=${makeColorCodes(
                  colors
                )}`
              }
              alt={(data && data.name) || ''}
            />
          </div>
        )}
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
            <button
              onClick={handleRandomPalette}
              className={styles.randomButton}
            >
              <FaRandom />
              Random Palette
            </button>
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
                  onChange={() => handleSelectVariant(item)}
                  className={styles.radioButton}
                />
              </label>
            ))}
          </div>
        </div>
        <div className={styles.form}>
          <h2 className={styles.title}>Name</h2>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => handleInputName(e)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
