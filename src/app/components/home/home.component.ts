import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthModel } from '@mean/models';
import { ApiService, ChatService, Message } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants } from '@mean/utils';
import { AuthService } from 'src/app/services/Auth.service';
import { LocalStorageConstants } from 'src/app/utils/local.storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent<Message | AuthModel.User> {
  showTyping = false;
  messages: Message[] = [];
  defaultImage: string = UriConstants.HOST + "/default.jpg"
  userData: AuthModel.User;
  userGetById: AuthModel.User;
  inputValue = '';
  constructor(
    protected override  readonly apiService: ApiService<Message | AuthModel.User>,
    protected readonly fb: FormBuilder,
    protected readonly auth: AuthService,
    private readonly chatService: ChatService,
    protected readonly router: ActivatedRoute,
  ) {
    super(apiService);
    this.getUserById(Number(this.router.snapshot.paramMap.get('id')));
    this.userData = this.auth.readFromSession(LocalStorageConstants.USER_TOKEN).user;
    this.getMessages();
    this.chatService.getMessages().subscribe((value) => {
      console.log('asd');
      this.messages = value;
    });
    this.chatService.userListening().subscribe((value) => {
      if (typeof value === 'boolean') {
        this.showTyping = value;
      } else {
        if ((value as AuthModel.User).id != this.userData.id) {
          this.showTyping = true;
        }
      }
    });
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
    });
  }

  private async getMessages() {
    this.messages = (await this.searchArrAsync({ url: UriConstants.MESSAGES })).response as Message[];
    console.log(this.messages);
  }

  setShowTyping() {
    console.log(this.inputValue);
    this.chatService.sendTyping(this.inputValue == '' ? false : this.userData);
  }

  saveMessages() {
    if (this.inputValue) {

      const dataSend = {
        userId: this.userData.id,
        content: this.inputValue,

      };
      this.create({ url: `${UriConstants.MESSAGES}/store`, data: dataSend });
      this.inputValue = '';
    }
  }

  deleteMessage(id: number) {
    this.delete({ url: `${UriConstants.MESSAGES}/${id}` });
  }
  async getUserById(id: number) {

    this.userGetById = (await this.searchAsync({ url: `${UriConstants.USERS}/${id}` })).response as AuthModel.User;
    console.log(this.userGetById);
  }

}
