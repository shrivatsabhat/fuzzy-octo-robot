
type TFilterScroll<T> = {
  list: T[];
  selected?: T;
  onClick: (item: T) => void;
  label?: string
};


// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export const FilterScroll = <T extends any,>({ list, selected, onClick, label = '' }: TFilterScroll<T>) => {
  return (
    <>
      {list.length ? <p className="read-the-source">{label}</p> : <></>}
      <section className="horizontal">
        {list?.map(item => (
          <button
            onClick={() => onClick(item)}
            className={selected === item ? 'selected' : ''}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            key={item as any}
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {item}
          </button>
        ))}
      </section>
    </>
  );
};