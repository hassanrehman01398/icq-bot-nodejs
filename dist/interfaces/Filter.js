"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Part_1 = require("./Entities/Part");
/** Фильтр проверяет тип события и наличие текста в нём */
var MessageFilter = (function () {
    function MessageFilter() {
    }
    MessageFilter.prototype.filter = function (event) {
        return event.data["text"] && event["text"].length > 0;
    };
    return MessageFilter;
}());
exports.MessageFilter = MessageFilter;
/** Фильтр проверяет наличие первого символа на равенство "/" или "." */
var CommandFilter = (function (_super) {
    __extends(CommandFilter, _super);
    function CommandFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.COMMAND_PREFIXES = ["/", "."];
        return _this;
    }
    CommandFilter.prototype.filter = function (event) {
        return (_super.prototype.filter.call(this, event) && this.COMMAND_PREFIXES.findIndex(function (r) { return r === event.data.text.trim()[0]; }) >= 0);
    };
    return CommandFilter;
}(MessageFilter));
exports.CommandFilter = CommandFilter;
/** Фильтр проверяет регулярным выражением текст сообщения и фильтрует по нему  */
var RegexpFilter = (function (_super) {
    __extends(RegexpFilter, _super);
    function RegexpFilter(pattern) {
        var _this = _super.call(this) || this;
        _this.pattern = pattern;
        return _this;
    }
    RegexpFilter.prototype.filter = function (event) {
        return _super.prototype.filter.call(this, event) && this.pattern.test(event.data["text"]);
    };
    return RegexpFilter;
}(MessageFilter));
exports.RegexpFilter = RegexpFilter;
/**
 * Фильтрует сообщения конкретного пользователя
 */
var SenderFilter = (function (_super) {
    __extends(SenderFilter, _super);
    function SenderFilter(user_id) {
        var _this = _super.call(this) || this;
        _this.user_id = user_id;
        return _this;
    }
    SenderFilter.prototype.filter = function (event) {
        return _super.prototype.filter.call(this, event) && event.data['from'] && event.data['from']['userId'] == this.user_id;
    };
    return SenderFilter;
}(MessageFilter));
exports.SenderFilter = SenderFilter;
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа файл
 */
var FileFilter = (function (_super) {
    __extends(FileFilter, _super);
    function FileFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileFilter.prototype.filter = function (event) {
        return _super.prototype.filter.call(this, event) && event.data['parts'] &&
            event.data['parts'].findIndex(function (r) { return r && r.type == Part_1.PartsType.FILE; }) >= 0;
    };
    return FileFilter;
}(MessageFilter));
exports.FileFilter = FileFilter;
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа изображение
 */
var ImageFilter = (function (_super) {
    __extends(ImageFilter, _super);
    function ImageFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageFilter.prototype.filter = function (event) {
        return _super.prototype.filter.call(this, event) &&
            event.data['parts'].findIndex(function (r) { return r && r["payload"] && r.payload["type"] && r.payload.type == Part_1.PayLoadFileType.IMAGE; }) >= 0;
    };
    return ImageFilter;
}(FileFilter));
exports.ImageFilter = ImageFilter;
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа видел
 */
var VideoFilter = (function (_super) {
    __extends(VideoFilter, _super);
    function VideoFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VideoFilter.prototype.filter = function (event) {
        return _super.prototype.filter.call(this, event) &&
            event.data['parts'].findIndex(function (r) { return r && r["payload"] && r.payload["type"] && r.payload.type == Part_1.PayLoadFileType.VIDEO; }) >= 0;
    };
    return VideoFilter;
}(FileFilter));
exports.VideoFilter = VideoFilter;
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа Аудио
 */
var AudioFilter = (function (_super) {
    __extends(AudioFilter, _super);
    function AudioFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AudioFilter.prototype.filter = function (event) {
        return _super.prototype.filter.call(this, event) &&
            event.data['parts'].findIndex(function (r) { return r && r["payload"] && r.payload["type"] && r.payload.type == Part_1.PayLoadFileType.AUDIO; }) >= 0;
    };
    return AudioFilter;
}(FileFilter));
exports.AudioFilter = AudioFilter;
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа Стикер
 */
var StickerFilter = (function (_super) {
    __extends(StickerFilter, _super);
    function StickerFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StickerFilter.prototype.filter = function (event) {
        return _super.prototype.filter.call(this, event) && event.data['parts'] &&
            event.data['parts'].findIndex(function (r) { return r && r.type == Part_1.PartsType.STICKER; }) >= 0;
    };
    return StickerFilter;
}(MessageFilter));
exports.StickerFilter = StickerFilter;
/**
 * Фильтрует события где был упомянут пользователь
 */
var MentionFilter = (function (_super) {
    __extends(MentionFilter, _super);
    function MentionFilter(userId) {
        var _this = _super.call(this) || this;
        _this.userId = userId;
        return _this;
    }
    MentionFilter.prototype.filter = function (event) {
        var _this = this;
        return _super.prototype.filter.call(this, event) && event.data['parts'] &&
            event.data['parts'].findIndex(function (r) { return r && r.type == Part_1.PartsType.MENTION && (!_this.userId || r.payload.userId == _this.userId); }) >= 0;
    };
    return MentionFilter;
}(MessageFilter));
exports.MentionFilter = MentionFilter;
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типо FORWARD - Перенаправленное (Пересылаемое сообщение)
 */
var ForwardFilter = (function (_super) {
    __extends(ForwardFilter, _super);
    function ForwardFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForwardFilter.prototype.filter = function (event) {
        return event.data['parts'] && event.data.parts.findIndex(function (r) { return r && r.type == Part_1.PartsType.FORWARD; }) >= 0;
    };
    return ForwardFilter;
}(MessageFilter));
exports.ForwardFilter = ForwardFilter;
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типо Reply - Цитата сообщения
 */
var ReplyFilter = (function (_super) {
    __extends(ReplyFilter, _super);
    function ReplyFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReplyFilter.prototype.filter = function (event) {
        return _super.prototype.filter.call(this, event) && event.data['parts'] &&
            event.data.parts.findIndex(function (r) { return r && r.type == Part_1.PartsType.REPLY; }) >= 0;
    };
    return ReplyFilter;
}(MessageFilter));
exports.ReplyFilter = ReplyFilter;
/**
 * Фильтрует сообщения состоящии из одной URL ссылки. Допускаются пробелы в начале и конце сообщения.
 */
var URLFilter = (function (_super) {
    __extends(URLFilter, _super);
    function URLFilter() {
        return _super.call(this, /^\s*https?:\/\/\S+\s*$/i) || this;
    }
    URLFilter.prototype.filter = function (event) {
        return _super.prototype.filter.call(this, event) && !new FileFilter().filter(event);
    };
    return URLFilter;
}(RegexpFilter));
exports.URLFilter = URLFilter;
/** Типы операций над фильтрами */
var TypeFilterOperation;
(function (TypeFilterOperation) {
    TypeFilterOperation[TypeFilterOperation["and"] = 1] = "and";
    TypeFilterOperation[TypeFilterOperation["or"] = 2] = "or";
    TypeFilterOperation[TypeFilterOperation["not"] = 3] = "not";
})(TypeFilterOperation = exports.TypeFilterOperation || (exports.TypeFilterOperation = {}));
/** Создаёт композитный фильтр из двух, применяя к ним оператор сравнения. Рекомендую использовать статические методы and, or, not */
var FilterComposite = (function () {
    function FilterComposite(type, leftFilter, rightFilter) {
        this.type = type;
        this.leftFilter = leftFilter;
        this.rightFilter = rightFilter;
    }
    FilterComposite.and = function (leftFilter, rightFilter) {
        return new FilterComposite(TypeFilterOperation.and, leftFilter, rightFilter);
    };
    FilterComposite.or = function (leftFilter, rightFilter) {
        return new FilterComposite(TypeFilterOperation.or, leftFilter, rightFilter);
    };
    FilterComposite.not = function (filter) {
        return new FilterComposite(TypeFilterOperation.not, filter);
    };
    FilterComposite.prototype.filter = function (event) {
        switch (this.type) {
            case TypeFilterOperation.and:
                return this.leftFilter.filter(event) && this.rightFilter.filter(event);
            case TypeFilterOperation.or:
                return this.leftFilter.filter(event) || this.rightFilter.filter(event);
            case TypeFilterOperation.not:
                return !this.leftFilter.filter(event);
        }
        throw "Not type filter";
    };
    return FilterComposite;
}());
exports.FilterComposite = FilterComposite;
var Filter = (function () {
    function Filter() {
    }
    /**
     * Фильтр проверяет тип события
     * и наличие текста в нём
     */
    Filter.message = new MessageFilter();
    /**
     * Фильтр проверяет наличие первого
     * символа на равенство "/" или "."
     */
    Filter.command = new CommandFilter();
    /** Фильтрует сообщения конкретного пользователя */
    Filter.file = new FileFilter();
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа изображение
     */
    Filter.image = new ImageFilter();
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа Видео
     */
    Filter.video = new VideoFilter();
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа Аудио
     */
    Filter.audio = new AudioFilter();
    /**
     * Фильтрует события и оставляет только сообщения
     * с полезной нагрузкой типа Аудио, Видео, Изображение
     */
    Filter.media = FilterComposite.or(FilterComposite.or(Filter.image, Filter.video), Filter.audio);
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа Аудио,
     * Видео, Изображение, Файл
     */
    Filter.data = FilterComposite.and(Filter.file, FilterComposite.not(Filter.media));
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа Стикер
     */
    Filter.sticker = new StickerFilter();
    /**
     * Фильтрует сообщения состоящии из одной URL ссылки.
     * Допускаются пробелы в начале и конце сообщения.
     */
    Filter.url = new URLFilter();
    /**
     * Фильтрует события и оставляет только сообщения
     * с полезной нагрузкой типа Аудио, Видео,
     * Изображение, Файл, Стикер, Ссылка
     *
     * Все сообщения у которых может быть текст.
     */
    Filter.text = FilterComposite.and(Filter.message, FilterComposite.not(FilterComposite.or(FilterComposite.or(FilterComposite.or(Filter.command, Filter.sticker), Filter.file), Filter.url)));
    /**
     * Фильтр проверяет регулярным выражением
     * текст сообщения и фильтрует по нему
     */
    Filter.regexp = RegexpFilter;
    /**
     * Фильтрует события где был упомянут пользователь
     */
    Filter.mention = MentionFilter;
    /**
     * Фильтрует события и оставляет только сообщения
     * с полезной нагрузкой типо FORWARD -
     * Перенаправленное (Пересылаемое сообщение) */
    Filter.forward = new ForwardFilter();
    /**  Фильтрует события и оставляет только сообщения
     * с полезной нагрузкой типо Reply - Цитата сообщения */
    Filter.reply = new ReplyFilter();
    /**
     * Фильтрует сообщения отпраленные конкретным пользователем
     */
    Filter.sender = SenderFilter;
    return Filter;
}());
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map