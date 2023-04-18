import { Link } from "react-router-dom";
import { getPokemonList } from "../../services";
import { useEffect, useState } from "react";
import { ButtonMorePokemons } from "./button-more-pokemons/button-more-pokemons";
import {
  PokemonListContainer,
  PokemonCard,
  StyledLink,
  CardInfo,
  TypeImg,
  PokemonImg,
  TypesContainer,
  PokemonName,
  PokemonId,
  StyledPokemonList,
  BackgroundCover,
} from "./styled";
import { ThemeContext } from "../../contexts/theme-contexts";
import React, { useContext } from "react";
import { TypesColorsContext } from "../../contexts/pokemon-info/type-color-contexts";
import { ButtonGoTop } from "../button-go-top/button-go-top";

const PokemonList = ({ types, selectedTypes }) => {
  const [pokemonsList, setPokemonsInfo] = useState([]);

  const [quantityOfPokemons, setQuantityOfPokemons] = useState(10);

  const addMorePokemons = (quantity) => {
    setQuantityOfPokemons(quantityOfPokemons + quantity);
  };

  const { pokemonsTypesColors } = useContext(TypesColorsContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await getPokemonList(quantityOfPokemons);
      setPokemonsInfo(pokemonData);
    };
    fetchData();
  }, [quantityOfPokemons]);

  const filteredItems = pokemonsList.filter(
    (pokemon) =>
      selectedTypes.size === 0 ||
      pokemon.types.some((types) => selectedTypes.has(types.type.name))
  );


  

  return (
    <StyledPokemonList>
      {/* <div>
                <h3>Filter</h3>

                <Form getType={getType} applyFilter={applyFilter} />
            </div> */}
      <PokemonListContainer>
        {filteredItems.map((pokemonInfo, index) => {
          const pokemonId = pokemonInfo.id;
          let color = [];

          return (
            <PokemonCard key={pokemonInfo.name} typeColor={color}>
              <Link to={`/pokemon/${pokemonInfo.name}`}>
                <StyledLink>
                  <BackgroundCover theme={theme} />
                  <PokemonImg
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    alt={pokemonInfo.name}
                  />
                  <CardInfo theme={theme}>
                    <PokemonName theme={theme}>{pokemonInfo.name}</PokemonName>
                    <PokemonId theme={theme}>#{pokemonInfo.id}</PokemonId>
                    <TypesContainer>
                      {pokemonInfo.types.map((pokemonType) => {
                        const type = pokemonType.type.name;

                        pokemonsTypesColors.forEach((pokemonType) => {
                          if (type === pokemonType.type) {
                            color.push(pokemonType.color);
                          }
                        });

                        return (
                          <TypeImg
                            key={type}
                            src={require(`../../images/types/${type}.png`)}
                            alt={type}
                          />
                        );
                      })}
                    </TypesContainer>
                  </CardInfo>
                </StyledLink>
              </Link>
            </PokemonCard>
          );
        })}
      </PokemonListContainer>

      <ButtonMorePokemons quantity={10} addMorePokemons={addMorePokemons} />
      {/* <ButtonGoTop /> */}
    </StyledPokemonList>
  );
};

export { PokemonList, Link };