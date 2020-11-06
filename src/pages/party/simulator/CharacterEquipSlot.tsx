import React, { useState } from 'react';
import styled from 'styled-components';

import {
  artifactInfo,
  ArtifactType,
  characterInfo,
  weaponInfo,
  WeaponType,
  WeaponName,
  ArtifactName,
  CharacterName
} from 'src/resources/data';
import { GridWrapper, ItemBadgeBox, Modal, RoundImage, BoxModelWrapper, RoundImageBox } from 'src/components';
import { ImageSrc, CategoryImages, ItemImages } from 'src/resources/images';

interface Items {
  [name: string]: {
    rank: number;
    type: WeaponType;
  };
}

type EquipmentName = WeaponName | ArtifactName;
type EquipmentCategory = ArtifactType | WeaponType;
type ArtifactCount = number;
type ArtifactSetName = string;

interface EquipmentSlotProps {
  category: EquipmentCategory;
  onClick: Function;
  characterName: CharacterName;
  characterEquipment: Map<EquipmentCategory, EquipmentName>;
  changeCharacterEquipment: Function;
}

const items: Items = Object.assign({}, weaponInfo, artifactInfo);

function EquipmentSlot(props: EquipmentSlotProps) {
  const [equipmentName, setEquipmentName] = useState<string>('');
  const [isVisibleEquipmentModal, setIsVisibleEquipmentModal] = useState<boolean>(false);

  function countArtifactSet(equiped: Map<EquipmentCategory, EquipmentName>) {
    let activeArtif: Map<ArtifactSetName, ArtifactCount> = new Map();
    equiped.forEach((name, category) => {
      if (artifactInfo[name]) {
        const artifactSet = artifactInfo[name].set;

        if (activeArtif.has(artifactSet)) {
          // @ts-ignore Check Has
          activeArtif.set(artifactSet, activeArtif.get(artifactSet) + 1);
        } else {
          activeArtif.set(artifactSet, 1);
        }
      }
    });
    props.onClick(activeArtif);
  }

  function putEquipment(name: EquipmentName) {
    props.characterEquipment.set(props.category, name);
    props.changeCharacterEquipment(props.characterEquipment);
    countArtifactSet(props.characterEquipment);
  }

  return (
    <BoxModelWrapper styles={{ margin: '0 0 0 6px', small: { margin: '0 0 3px 3px' } }}>
      <ItemBadgeBox
        tooltip={equipmentName}
        rank={items[equipmentName] !== undefined ? items[equipmentName].rank : undefined}
        hoverInnerColor={'#f1f2f3'}
        onClick={() => {
          setIsVisibleEquipmentModal(true);
        }}
        badge={
          <RoundImage
            src={CategoryImages[props.category]}
            styles={{
              width: '30px',
              height: '30px',
              small: {
                width: '25px',
                height: '25px'
              }
            }}
          />
        }
        child={
          <RoundImageBox
            src={ItemImages[equipmentName]}
            styles={{
              boxStyle: {
                width: '100px',
                height: '100px',
                margin: '0px',
                medium: { width: '75px', height: '75px' },
                small: { width: '65px', height: '65px', margin: '3px' }
              },
              imageStyle: {
                width: '80px',
                height: '80px',
                small: { width: '55px', height: '55px' }
              }
            }}
          />
        }
        isHoverdToolTip={false}
        isRankVisible={false}
        styles={{
          tooltipStyles: { bottom: '0px' }
        }}
      />
      <Modal
        cancel={() => {
          setIsVisibleEquipmentModal(false);
        }}
        visible={isVisibleEquipmentModal}
      >
        <GridWrapper>
          {Object.keys(items).map((name: EquipmentName) => {
            if (items[name] && items[name].type === props.category) {
              return (
                <ItemBadgeBox
                  key={name}
                  tooltip={name}
                  rank={items[name].rank}
                  hoverInnerColor={'#f1f2f3'}
                  onClick={() => {
                    setEquipmentName(name);
                    putEquipment(name);
                  }}
                  badge={
                    <RoundImage
                      src={CategoryImages[items[name].type]}
                      styles={{
                        width: '30px',
                        height: '30px',
                        small: {
                          width: '25px',
                          height: '25px'
                        }
                      }}
                    />
                  }
                  child={
                    <RoundImageBox
                      src={ItemImages[name]}
                      styles={{
                        boxStyle: {
                          width: '100px',
                          height: '100px',
                          backgroundColor: name === equipmentName ? '#f1f2f3' : 'transparent',
                          margin: '0px'
                        },
                        imageStyle: {
                          width: '80px',
                          height: '80px',
                          borderRadius: '35%',
                          small: { width: '60px', height: '60px' }
                        }
                      }}
                    />
                  }
                  styles={{
                    tooltipStyles: { bottom: '0px' }
                  }}
                />
              );
            }
            return null;
          })}
        </GridWrapper>
      </Modal>
    </BoxModelWrapper>
  );
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  '@media screen and (max-width: 768px)': {
    flexWrap: 'wrap'
  }
});

interface Props {
  onClick: Function;
  characterSrc: ImageSrc;
  characterName: string;
}

export function CharacterEquipSlot(props: Props) {
  const [characterEquipment, setCharacterEquipment] = useState<Map<EquipmentCategory, EquipmentName>>(new Map());

  function changeCharacterEquipment(equiped: Map<EquipmentCategory, EquipmentName>) {
    setCharacterEquipment(equiped);
  }

  if (props.characterSrc !== undefined) {
    const itemCategoryList: Array<WeaponType | ArtifactType> = [
      characterInfo[props.characterName].weapon as WeaponType,
      'Flower',
      'Feather',
      'HourGlass',
      'HolyGrail',
      'Crown'
    ];

    return (
      <Container>
        {itemCategoryList.map((cateogry: WeaponType | ArtifactType) => {
          return (
            <EquipmentSlot
              key={cateogry}
              characterEquipment={characterEquipment}
              characterName={props.characterName}
              changeCharacterEquipment={changeCharacterEquipment}
              onClick={props.onClick}
              category={cateogry}
            />
          );
        })}
      </Container>
    );
  } else {
    return null;
  }
}
