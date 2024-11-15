export const theme = {
  colors: {
    background: '#faf8ef',
    gameBackground: '#bbada0',
    lightText: '#f9f6f2',
    darkText: '#776e65',
    tile: {
      '2': { background: '#eee4da', text: '#776e65' },
      '4': { background: '#ede0c8', text: '#776e65' },
      '8': { background: '#f2b179', text: '#f9f6f2' },
      '16': { background: '#f59563', text: '#f9f6f2' },
      '32': { background: '#f67c5f', text: '#f9f6f2' },
      '64': { background: '#f65e3b', text: '#f9f6f2' },
      '128': { background: '#edcf72', text: '#f9f6f2' },
      '256': { background: '#edcc61', text: '#f9f6f2' },
      '512': { background: '#edc850', text: '#f9f6f2' },
      '1024': { background: '#edc53f', text: '#f9f6f2' },
      '2048': { background: '#edc22e', text: '#f9f6f2' },
    },
  },
  sizes: {
    tileSize: '100px',
    gap: '15px',
    mobileTileSize: '60px',
    mobileGap: '10px',
  },
  breakpoints: {
    mobile: '520px',
  },
  transitions: {
    tile: 'all 0.15s ease-in-out',
  },
};
