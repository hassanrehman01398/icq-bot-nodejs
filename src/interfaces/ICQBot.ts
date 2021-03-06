
import { ResponseAdmin } from "./Response/ResponseAdmin"
import { Self } from "./Entities/Self";
import { ResponseMessage } from "./Response/ResponseMessage";
import { ResponseSendFile, ResponseUploadFile } from "./Response/ResponseSendFile";
import { ResponseSendVoice, ResponseUploadVoice } from "./Response/ResponseSendVoice";
import { Chat } from "./Entities/Chat";
import { ResponseFileInfo } from "./Response/ResponseFileInfo";
import { ResponseEvent } from "./Events/Event";
import { ResponseMembers } from "./Response/ResponseMembers";
import { ResponseUsers } from "./Response/ResponseUsers";
import { ICQButton } from "../class/ICQButton";

export interface ICQOptions {
    apiUrlBase:string, 
    name:string, 
    version:string, 
    timeoutS: number, 
    pollTimeS: number
}

export interface MembersItem {
    sn: string | number;
}
export interface ICQBot {
 
    getUNI(): number;
    getUserAgent(): string;
    startPolling(): ICQBot;
    stop(): ICQBot;
    // private signalHandler(sig: number): void;
    // idle(): ICQBot;
    eventsGet(pollTimeS: number, lastEventId: number): Promise<ResponseEvent>;
    selfGet(): Promise<Self>;
    sendText(chatId: string, text: String, replyMsgId?: string, forwardChatId?: string, forwardMsgId?: string, inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][]): Promise<ResponseMessage>;
    sendFile(chatId: string, fileId: string, file: string, caption: String, replyMsgId?: String, forwardChatId?: String, forwardMsgId?: String, inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][]): Promise<ResponseUploadFile|ResponseSendFile>;
    sendVoice(chatId: string, fileId: string, file: string, replyMsgId?: String, forwardChatId?: String, forwardMsgId?: String, inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][]): Promise<ResponseUploadVoice|ResponseSendVoice>;

    editText(chatId: string, msgId: string, text: String, inlineKeyboardMarkup?: ICQButton[]): Promise<Response>;
    deleteMessages(chatId: string, msgId: string): Promise<Response>;

    /** Работа с событиями на ответ обработки кнопки */
    answerCallbackQuery(chatId: string, text: string, showAlert: boolean, url: string): Promise<Response>;

    /** Отправить действия в чат */
    sendActions(chatId: string, actions:  'looking'|'typing'): Promise<Response>;

    /** Получить информацию о чате */
    getChatInfo(chatId: string): Promise<Chat>;
    /** Получить список администраторов чата */
    getChatAdmins(chatId: string): Promise<ResponseAdmin>;
    /**
     * Подробности по файлу
     * @param fileId Номер файла
     */
    getFileInfo(fileId: string): Promise<ResponseFileInfo>;
    pinMessage(chatId: string, msgId: string): Promise<Response>;
    unpinMessage(chatId: string, msgId: string): Promise<Response>;

    setTitle(chatId: string, title: string): Promise<Response>;
    setAbout(chatId: string, text: string): Promise<Response>;
    setRules(chatId: string, rules: string): Promise<Response>;
    setAvatar(chatId: string, file: string): Promise<Response>;

    getMembers(chatId: string, cursor?: string): Promise<ResponseMembers>;
    deleteMembers(chatId: string, members: MembersItem[]): Promise<Response>;
    getBlockedUsers(chatId: string): Promise<ResponseUsers>;
    getPendingUsers(chatId: string): Promise<ResponseUsers>;


    blockUser(chatId: string, userId: string, delLastMessages?: boolean): Promise<Response>;
    unblockUser(chatId: string, userId: string): Promise<Response>;
    resolvePending(chatId: string, approve: boolean, userId?: string, everyone?: boolean): Promise<Response>;

}
