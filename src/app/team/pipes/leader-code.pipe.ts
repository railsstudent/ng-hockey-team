import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models';

@Pipe({
  name: 'leaderCode',
})
export class LeaderCodePipe implements PipeTransform {
  transform(player: Player) {
    if (!player) {
      return '';
    }
    console.log(player.isCaptain, player.isAssistantCaptain);
    return player.isCaptain === 'true' ? '(C)' : player.isAssistantCaptain === 'true' ? '(A)' : '';
  }
}
