import './sources.css';
import type { Source } from '../../../types/news-api';

type SourceItem = Pick<Source, 'id' | 'name'>;

class Sources {
    public draw(data: ReadonlyArray<SourceItem>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        const sourcesContainer = document.querySelector('.sources');

        if (!(sourceItemTemp instanceof HTMLTemplateElement) || !sourcesContainer) {
            throw new Error('Sources template or container not found');
        }

        data.forEach((item) => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);
            const sourceName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');

            if (!sourceName || !sourceItem) {
                throw new Error('Source template elements not found');
            }

            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        sourcesContainer.append(fragment);
    }
}

export default Sources;
