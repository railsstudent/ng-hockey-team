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
    return player.isCaptain ? '(C)' : player.isAssistantCaptain ? '(A)' : '';
  }
}
