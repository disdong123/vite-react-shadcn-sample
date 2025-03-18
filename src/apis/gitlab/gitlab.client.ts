import { DocsType } from './types/docs.type'

class ProjectClient {
  getProjects() {
    return {
      projects: [
        {
          id: 1,
          title: 'platform-architecture',
          type: 'group',
          docsUrl: null,
          subItems: [
            {
              id: 2,
              title: 'components',
              type: 'group',
              docsUrl: null,
              subItems: [
                {
                  id: 3,
                  title: 'ci-components',
                  type: 'project',
                  docsUrl: '/html/redoc-static.html',
                  subItems: [],
                },
                {
                  id: 4,
                  title: 'build-tools',
                  type: 'project',
                  docsUrl: null,
                  subItems: [],
                },
              ],
            },
            {
              id: 5,
              title: 'developer-portal',
              type: 'group',
              docsUrl: null,
              subItems: [
                {
                  id: 6,
                  title: 'frontend-services',
                  type: 'project',
                  docsUrl: 'http://petstore.swagger.io/v2/swagger.json',
                  subItems: [],
                },
                {
                  id: 7,
                  title: 'backend-services',
                  type: 'project',
                  docsUrl: null,
                  subItems: [],
                },
              ],
            },
          ],
        },
      ],
    }.projects
  }

  getProjectOverview(id: number) {
    return this.getProjects().filter((p) => p.id === id)
  }
}

class DocsClient {
  /**
   * TODO 실제 api response 로 docsType 변경 필요. DocsType -> TreeNavGroupItemType 매핑 필요
   */
  getDocs(): Array<DocsType> {
    return {
      docs: [
        {
          id: 1,
          title: 'platform-architecture',
          type: 'group',
          docsUrl: null,
          subItems: [
            {
              id: 2,
              title: 'components',
              type: 'group',
              docsUrl: null,
              subItems: [
                {
                  id: 3,
                  title: 'ci-components',
                  type: 'project',
                  docsUrl: '/html/redoc-static.html',
                  subItems: [],
                },
                {
                  id: 4,
                  title: 'build-tools',
                  type: 'project',
                  docsUrl: null,
                  subItems: [],
                },
              ],
            },
            {
              id: 5,
              title: 'developer-portal',
              type: 'group',
              docsUrl: null,
              subItems: [
                {
                  id: 6,
                  title: 'frontend-services',
                  type: 'project',
                  docsUrl: 'http://petstore.swagger.io/v2/swagger.json',
                  subItems: [],
                },
                {
                  id: 7,
                  title: 'backend-services',
                  type: 'project',
                  docsUrl: null,
                  subItems: [],
                },
              ],
            },
          ],
        },
        {
          id: 8,
          title: 'sre',
          type: 'group',
          docsUrl: null,
          subItems: [
            {
              id: 9,
              title: 'ci-pipelines',
              type: 'group',
              docsUrl: null,
              subItems: [
                {
                  id: 10,
                  title: 'gitlab-integration',
                  type: 'project',
                  docsUrl: 'http://petstore.swagger.io/v2/swagger.json',
                  subItems: [],
                },
                {
                  id: 11,
                  title: 'jenkins-integration',
                  type: 'project',
                  docsUrl: null,
                  subItems: [],
                },
              ],
            },
            {
              id: 12,
              title: 'cd-pipelines',
              type: 'group',
              docsUrl: null,
              subItems: [
                {
                  id: 13,
                  title: 'deployment-tools',
                  type: 'project',
                  docsUrl: null,
                  subItems: [],
                },
                {
                  id: 14,
                  title: 'monitoring-services',
                  type: 'project',
                  docsUrl:
                    'https://gist.githubusercontent.com/lenage/08964335de9064540c8c335fb849c5da/raw/6d63e3546897356882ed7e30cd48891a24e2b354/feature.swagger.json',
                  subItems: [],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          title: 'sre',
          type: 'group',
          docsUrl: null,
          subItems: [
            {
              id: 16,
              title: 'ci-pipelines',
              type: 'group',
              docsUrl: null,
              subItems: [
                {
                  id: 17,
                  title: 'gitlab-integration',
                  type: 'project',
                  docsUrl: 'http://petstore.swagger.io/v2/swagger.json',
                  subItems: [],
                },
                {
                  id: 18,
                  title: 'jenkins-integration',
                  type: 'project',
                  docsUrl: null,
                  subItems: [],
                },
              ],
            },
            {
              id: 19,
              title: 'cd-pipelines',
              type: 'group',
              docsUrl: null,
              subItems: [
                {
                  id: 20,
                  title: 'deployment-tools',
                  type: 'project',
                  docsUrl: null,
                  subItems: [],
                },
                {
                  id: 21,
                  title: 'monitoring-services',
                  type: 'project',
                  docsUrl:
                    'https://gist.githubusercontent.com/lenage/08964335de9064540c8c335fb849c5da/raw/6d63e3546897356882ed7e30cd48891a24e2b354/feature.swagger.json',
                  subItems: [],
                },
                {
                  id: 22,
                  title: 'need-more-long-titles...............',
                  type: 'project',
                  docsUrl:
                    'https://gist.githubusercontent.com/lenage/08964335de9064540c8c335fb849c5da/raw/6d63e3546897356882ed7e30cd48891a24e2b354/feature.swagger.json',
                  subItems: [],
                },
              ],
            },
          ],
        },
        {
          id: 23,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 24,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 25,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 26,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 27,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 28,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 29,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 30,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 31,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 32,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 33,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 34,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 35,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 36,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 37,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
        {
          id: 38,
          title: 'need-more-long-titles...............',
          type: 'project',
          docsUrl: '/html/redoc-static.html',
          subItems: [],
        },
      ],
    }.docs
  }
}

export const docsClient = new DocsClient()
export const projectClient = new ProjectClient()
