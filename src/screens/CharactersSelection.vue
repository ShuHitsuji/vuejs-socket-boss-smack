<template>
  <div class="screen">
    <section class="characters-selection">
      <h1 class="title">Bienvenidos al combate</h1>
      <h2 class="subtitle">Elijan sus personajes</h2>
      <div class="characters-container">
        <div class="character">
          <img alt="character" src="../assets/characters/mage-hero.png" />
        </div>
        <div class="character">
          <img alt="character" src="../assets/characters/mage-hero.png" />
        </div>
        <div class="character">
          <img alt="character" src="../assets/characters/mage-hero.png" />
        </div>
      </div>
    </section>
    <footer class="footer">
      <aside class="tutorial">i</aside>
      <main class="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </main>
      <nav class="start">
        <i class="arrow left"></i>
      </nav>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CharactersSelection'
}
</script>

<style scoped>
  .screen {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-family: Flipps;
    font-size: 40px;
    margin: 5px;
    color: rgba(249, 255, 76, 0.55);
  }

  .subtitle {
    font-size: 20px;
    margin: 2px;
    color: rgba(249, 255, 76, 0.55);
  }

  .characters-selection {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #545b61;
  }

  .characters-container {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .character {
    margin: 20px;
  }

  .footer {
    display: flex;
    min-height: 300px;
    background: #333;
    justify-content: space-between;
  }

  .tutorial {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .description {
    flex: 2;
    padding: 10px;
    color: white;
    font-family: PressStart;
    font-size: 12px;
  }

  .start {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow {
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    transform: rotate(-45deg) scale(5);
    -webkit-transform: rotate(-45deg) scale(5);
  }
</style>