import './news.css';
import type { Article } from '../../../types/news-api';

class News {
    public draw(data: ReadonlyArray<Article>): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');
        const newsContainer = document.querySelector('.news');

        if (!(newsItemTemp instanceof HTMLTemplateElement) || !newsContainer) {
            throw new Error('News template or container not found');
        }

        news.forEach((item, idx) => {
            const newsClone = document.importNode(newsItemTemp.content, true);
            const newsItem = newsClone.querySelector('.news__item');
            const photo = newsClone.querySelector('.news__meta-photo');
            const author = newsClone.querySelector('.news__meta-author');
            const date = newsClone.querySelector('.news__meta-date');
            const title = newsClone.querySelector('.news__description-title');
            const source = newsClone.querySelector('.news__description-source');
            const description = newsClone.querySelector('.news__description-content');
            const readMore = newsClone.querySelector('.news__read-more a');

            if (
                !newsItem ||
                !(photo instanceof HTMLElement) ||
                !author ||
                !date ||
                !title ||
                !source ||
                !description ||
                !readMore
            ) {
                throw new Error('News template elements not found');
            }

            if (idx % 2) newsItem.classList.add('alt');

            photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            author.textContent = item.author || item.source.name;
            date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            title.textContent = item.title;
            source.textContent = item.source.name;
            description.textContent = item.description ?? '';
            readMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.replaceChildren(fragment);
    }
}

export default News;
