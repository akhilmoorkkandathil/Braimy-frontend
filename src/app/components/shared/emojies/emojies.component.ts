import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emojies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emojies.component.html',
  styleUrl: './emojies.component.css'
})
export class EmojiesComponent {
  @Output() emojiSelected = new EventEmitter<string>();

  emojis = [
    '😀 ', '😃 ', '😄 ', '😁 ', '😆 ', '😅 ', '😂 ', '🤣 ',
    '😊 ', '😇 ', '🙂 ', '🙃 ', '😉 ', '😌 ', '😍 ', '🥰 ',
    '😘 ', '😗 ', '😙 ', '😚 ', '😋 ', '😛 ', '😝 ', '😜 ',
    '🤪 ', '🤨 ', '🧐 ', '🤓 ', '😎 ', '🤩 ', '🥳 ', '😏 ',
    '😒 ', '😞 ', '😔 ', '😟 ', '😕 ', '🙁 ', '☹️ ', '😣 ',
    '😖 ', '😫 ', '😩 ', '🥺 ', '😢 ', '😭 ', '😤 ', '😠 ',
    '😡 ', '🤬 ', '🤯 ', '😳 ', '🥵 ', '🥶 ', '😱 ', '😨 ',
    '😰 ', '😥 ', '😓 ', '🤗 ', '🤔 ', '🤭 ', '🤫 ', '🤥 '
  ];

  selectEmoji(emoji: string) {
    this.emojiSelected.emit(emoji);
  }
}
