export default {
  '**/*.(ts|tsx)': 'npx tsc-files --noEmit',

  '**/*.(js|jsx|ts|tsx)': filenames => [`npx prettier --write ${filenames.join(' ')}`],

  '**/*.(md|json)': filenames => `npx prettier --write ${filenames.join(' ')}`,
}
