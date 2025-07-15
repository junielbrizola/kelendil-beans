export const dynamic = 'auto';

import React from 'react';
import { Stack } from '@mui/material';
import { ProductCard } from '@/components/productCard';

export default function HomePage() {
  return (
    <Stack
      gap={39}
    >
      <ProductCard 
        title="CCN-51"
        levels={[
          {
            aroma: 'Notas florais e frutadas sutis que lembram maçã verde, pêssego e um fundo levemente herbáceo.',
            flavor: 'Preserva uma acidez brilhante, com toques cítricos e um leve adocicado de caramelo claro. Ao final, aparece um sutil amargor muito equilibrado, quase imperceptível, que limpa o paladar.',
            color: 'Marrom claro, com brilho acetinado e pouca opacidade.',
            texture: 'A manteiga de cacau permanece mais fluida, conferindo uma sensação macia em boca e boa fluidez ao derreter.',
            summary: 'Ideal para quem busca um chocolate de origem refrescante e aromaticamente complexo, perfeito para degustações puras ou harmonizar com vinhos brancos leves, chás verdes e queijos suaves.',
            price: 5000,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            aroma: 'Notas carameladas e achocolatadas, com leve toque de noz e amêndoas.',
            flavor: 'Equilíbrio entre doçura e amargor, realçando notas de chocolate ao leite e toques de malte.',
            color: 'Marrom médio, ligeiramente mais escuro que na torra leve.',
            texture: 'Mais cremosa, com corpo médio e boa persistência em boca.',
            summary: 'Ótimo para chocolates de mesa e tabletes ao leite, bem como bebidas quentes encorpadas.',
            price: 5500,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            aroma: 'Notas profundas de chocolate amargo, com nuances de tabaco e especiarias.',
            flavor: 'Amargor mais pronunciado, com notas de frutas secas e um leve defumado.',
            color: 'Marrom escuro intenso.',
            texture: 'Mais densa, com sensação quase aveludada e longo final de boca.',
            summary: 'Recomendado para bombons de recheio escuro e harmonizações com vinhos tintos encorpados.',
            price: 6000,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            aroma: 'Notas intensas de cacau torrado, com fundo de café e toques de caramelo queimado.',
            flavor: 'Amargor marcante, quase robusto, com notas de cacau puro e final persistente.',
            color: 'Marrom muito escuro, quase pretinho.',
            texture: 'Pasta densa, com sensação firme em boca.',
            summary: 'Indicado para chocolates 100% cacau e uso culinário em receitas mais amargas e trufas.',
            price: 6500,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ]}
      />

      <ProductCard 
        inverted={true}
        title="Catongo"
        levels={[
          {
            aroma: 'Notas florais delicadas de jasmim e rosas, com toques de frutas brancas como pera e maçã.',
            flavor: 'Sabor suave e levemente adocicado, lembrando mel e frutas de caroço, com baixa amargura.',
            color: 'Marrom claríssimo, quase bege, com brilho acetinado.',
            texture: 'Derretimento rápido e sensação aveludada, muito delicada em boca.',
            summary: 'Perfeito para origin bars ultra refinados e degustações puras, realçando a finesse do Catongo.',
            price: 7000,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            aroma: 'Toques de mel e frutas secas (damasco, figo), com um leve fundo floral.',
            flavor: 'Equilíbrio entre doçura e um leve amargor, surgem nuances de castanhas e melado.',
            color: 'Marrom claro, ainda translúcido.',
            texture: 'Corpo médio, cremoso e macio, com boa distribuição de gordura.',
            summary: 'Ideal para chocolates de mesa sofisticados e harmonizações com espumantes suaves.',
            price: 7500,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            aroma: 'Notas de especiarias doces, melado intenso e um toque de tabaco leve.',
            flavor: 'Amargor moderado, com final de boca persistente e notas de frutas secas torradas.',
            color: 'Marrom médio escuro.',
            texture: 'Mais encorpada, quase aveludada, com final levemente seco.',
            summary: 'Excelente para bombons recheados e harmonizações com vinhos tintos jovens.',
            price: 8000,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            aroma: 'Aroma robusto de cacau torrado, com nuances de café suave e caramelo queimado.',
            flavor: 'Amargor pronunciado, notas de cacau puro e um leve toque defumado.',
            color: 'Marrom muito escuro, quase preto.',
            texture: 'Pasta densa e firme, com sensação mais “seca” em boca.',
            summary: 'Recomendado para chocolates com alta porcentagem de cacau (70%+), trufas intensas e uso culinário.',
            price: 8500,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ]}
      />

      <ProductCard 
        title="Amelonado"
        levels={[
          {
            aroma: 'Notas de amêndoas e nozes frescas, com leve toque de baunilha natural.',
            flavor: 'Doçura suave e acidez moderada, lembrando caramelo claro e mel.',
            color: 'Marrom claro, quente e brilhante.',
            texture: 'Suave e macia, com bom derretimento.',
            summary: 'Perfeito para chocolates ao leite mais delicados e blends suaves.',
            price: 6000,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            aroma: 'Aroma de chocolate ao leite e caramelo, com nuances de noz-pecã.',
            flavor: 'Equilíbrio agradável entre doçura e um amargor leve, realçando notas de malte.',
            color: 'Marrom médio, opaco.',
            texture: 'Cremosa e consistente, com corpo mais pronunciado.',
            summary: 'Ótimo para tabletes de 40–50% e bebidas quentes encorpadas.',
            price: 6500,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            aroma: 'Notas de cacau profundo e nozes torradas, com fundo levemente terroso.',
            flavor: 'Amargor moderado a marcante, surgem notas de café e leve defumado.',
            color: 'Marrom escuro intenso.',
            texture: 'Densa e aveludada, com boa persistência em boca.',
            summary: 'Indicado para chocolates 60–70% e harmonizações com vinhos tintos leves.',
            price: 7000,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            aroma: 'Aroma intenso de cacau torrado, com nuances de café forte e chocolate amargo.',
            flavor: 'Amargor robusto, final longo com notas de cacau puro e leve acidez residual.',
            color: 'Marrom quase preto.',
            texture: 'Firme e firme, sensação “seca” no final.',
            summary: 'Perfeito para chocolates 85–100%, uso culinário em receitas que pedem sabor marcante.',
            price: 7500,
            image: "https://images.unsplash.com/photo-1691960604781-278b0a984749?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ]}      
      />
    </Stack>
  );
}
