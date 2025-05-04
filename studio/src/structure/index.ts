import {CogIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

const DISABLED_TYPES = ['settings', 'assist.instruction.context']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Organize by type and language
        .map((listItem) => {
          const docType = listItem.getId()

          // Only apply for internationalized document types
          if (docType && ['post', 'page', 'person'].includes(docType)) {
            return S.listItem()
              .title(pluralize(listItem.getTitle() as string))
              .child(
                S.list()
                  .title(pluralize(listItem.getTitle() as string))
                  .items([
                    // English documents (default language)
                    S.listItem()
                      .title('English')
                      .child(
                        S.documentList()
                          .title('English')
                          .filter('_type == $type && (language == "en" || !defined(language))')
                          .params({type: docType}),
                      ),
                    // French documents
                    S.listItem()
                      .title('French')
                      .child(
                        S.documentList()
                          .title('French')
                          .filter('_type == $type && language == "fr"')
                          .params({type: docType}),
                      ),
                    // Japanese documents
                    S.listItem()
                      .title('Japanese')
                      .child(
                        S.documentList()
                          .title('Japanese')
                          .filter('_type == $type && language == "ja"')
                          .params({type: docType}),
                      ),
                    // Spanish documents
                    S.listItem()
                      .title('Spanish')
                      .child(
                        S.documentList()
                          .title('Spanish')
                          .filter('_type == $type && language == "es"')
                          .params({type: docType}),
                      ),
                  ]),
              )
          }

          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      // Settings Singleton
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
